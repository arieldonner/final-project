require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const path = require('path');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const authorizationMiddleware = require('./authorization-middleware');
const uploadsMiddleware = require('./uploads-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));
app.use(express.json());

app.use(staticMiddleware);

app.post('/api/auth/sign-up', (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("userName", "hashedPassword")
        values ($1, $2)
        returning "userId", "userName"
      `;
      const params = [userName, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new ClientError(401, 'invalid login');
  }

  const sql = `
      select "userId",
              "hashedPassword"
          from "users"
        where "userName" = $1
  `;
  const params = [userName];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, userName };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.get('/api/events', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select "eventName",
            "startDate",
            "startTime",
            "endTime",
            "locationName",
            "eventId"
      from "events"
      where "userId" = $1`;
  const params = [userId];
  db.query(sql, params)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/events/:startDate', (req, res, next) => {
  const startDate = req.params.startDate;
  const { userId } = req.user;
  if (!startDate) {
    throw new ClientError(400, 'startDate must be a date');
  }
  const sql = `
  select "eventName",
            "startDate",
            "startTime",
            "endTime",
            "locationName",
            "eventId"
      from "events"
      where "startDate" = $1
        and "userId" = $2
      `;
  const params = [startDate, userId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        res.json(null);
      } else {
        res.json(result.rows);
      }
    })
    .catch(err => next(err));
});

app.get('/api/event/:eventId', (req, res, next) => {
  const eventId = Number(req.params.eventId);
  if (!eventId) {
    throw new ClientError(400, 'eventId must be a positive integer');
  }
  const sql = `
  select "eventName",
            "startDate",
            "startTime",
            "endTime",
            "locationName"
      from "events"
      where "eventId" = $1
      `;
  const params = [eventId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find event with eventId ${eventId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/create/event', (req, res, next) => {
  const { userId } = req.user;
  const { eventName, startDate, startTime, endTime, locationName } = req.body;
  if (!eventName || !startDate || !startTime || !endTime) {
    throw new ClientError(400, 'Event Name, Start Date, Start Time, and End Time are required fields.');
  }
  const sql = `
  insert into "events" ("userId", "eventName", "startDate", "startTime", "endTime", "locationName")
  values ($1, $2, $3, $4, $5, $6)
  returning *
  `;
  const params = [userId, eventName, startDate, startTime, endTime, locationName];
  db.query(sql, params)
    .then(result => {
      const [event] = result.rows;
      res.status(201).json(event);
    })
    .catch(err => next(err));
});

app.put('/api/edit/event/:eventId', (req, res, next) => {
  const eventId = Number(req.params.eventId);
  const editEvent = req.body;
  if (!eventId) {
    throw new ClientError(400, 'eventId must be a positive integer');
  }
  const sql = `
    update "events"
      set "eventName" = $1,
          "startDate" = $2,
          "startTime" = $3,
          "endTime" = $4,
          "locationName" = $5
      where "eventId" = $6
      returning *
      `;
  const params = [editEvent.eventName, editEvent.startDate, editEvent.startTime, editEvent.endTime, editEvent.locationName, eventId];
  db.query(sql, params)
    .then(result => {
      const event = result.rows[0];
      if (!event) {
        throw new ClientError(404, `Cannot find event with eventId ${eventId}`);
      }
      res.status(201).json(event);
    })
    .catch(err => next(err));
});

app.delete('/api/delete/event/:eventId', (req, res, next) => {
  const eventId = Number(req.params.eventId);
  if (!eventId) {
    throw new ClientError(400, 'eventId must be a positive integer');
  }
  const sql = `
    delete
        from "events"
      where "eventId" = $1
      returning *
      `;
  const params = [eventId];
  db.query(sql, params)
    .then(result => {
      const event = result.rows[0];
      if (!event) {
        throw new ClientError(404, `Cannot find event with eventId ${eventId}`);
      } else {
        res.sendStatus(204);
      }
    })
    .catch(err => next(err));
});

app.get('/api/outfits', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select "outfitName",
            "outfitImg",
            "category",
            "star",
            "outfitId"
      from "outfits"
      where "userId" = $1`;
  const params = [userId];
  db.query(sql, params)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.post('/api/create/outfit', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.user;
  const { outfitName, category, bottoms, makeup, star } = req.body;
  if (!outfitName || !category) {
    throw new ClientError(400, 'Outfit Name and Category are required fields.');
  }
  const outfitImg = req.file.location;
  const sql = `
  insert into "outfits" ("userId", "outfitName", "outfitImg", "category", "bottoms", "makeup", "star")
  values ($1, $2, $3, $4, $5, $6, $7)
  returning *
  `;
  const params = [userId, outfitName, outfitImg, category, bottoms, makeup, star];
  db.query(sql, params)
    .then(result => {
      const [outfit] = result.rows;
      res.status(201).json(outfit);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
