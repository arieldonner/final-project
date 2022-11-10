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

// if (process.env.NODE_ENV === 'development') {
//   app.use(require('./dev-middleware')(publicPath));
// }

app.use(express.static(publicPath));
app.use(express.json());

app.use(staticMiddleware);

app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.get('/api/events', (req, res, next) => {
  const sql = `
    select "eventName",
            "startDate",
            "startTime",
            "endDate",
            "endTime",
            "locationName"
      from "events"
      join "locations" using ("locationId")`;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/events/:eventId', (req, res, next) => {
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
      join "locations"
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
