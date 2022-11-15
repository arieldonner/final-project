require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const path = require('path');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

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

app.get('/api/events', (req, res, next) => {
  const sql = `
    select "eventName",
            "startDate",
            "startTime",
            "endDate",
            "endTime",
            "locationName",
            "eventId"
      from "events"
      join "locations" using ("locationId")`;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/events/:startDate', (req, res, next) => {
  const startDate = req.params.startDate;
  if (!startDate) {
    throw new ClientError(400, 'startDate must be a date');
  }
  const sql = `
  select "eventName",
            "startDate",
            "startTime",
            "endDate",
            "endTime",
            "locationName",
            "eventId"
      from "events"
      join "locations" using ("locationId")
      where "startDate" = $1
      `;
  const params = [startDate];
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
            "endDate",
            "endTime",
            "locationName"
      from "events"
      join "locations" using ("locationId")
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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
