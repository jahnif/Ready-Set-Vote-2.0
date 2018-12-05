require('dotenv').config();
const serverless = require('serverless-http');
const express = require('express');
const app = express();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DB_CONNECTIONSTRING,
  ssl: true
});

app.get('/api/districts', (req, res) => {
  pool.query('select id, name, api_id from district', (err, result) => {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.send(JSON.stringify(result.rows));
    }
  });
});

module.exports.handler = serverless(app);
