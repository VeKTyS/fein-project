const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./config/db');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv/config');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const detailsSample = require('./data/details_sample.json');

app.use(cors());

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
  connection.release();
}

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// get details sample
app.get('/api/details_sample', (req, res) => {
  res.json(detailsSample);
});

app.listen(5000, () => console.log('Backend running on port 5000'));