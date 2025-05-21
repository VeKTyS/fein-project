const express = require('express');
const bodyParser = require('body-parser');
const conn = require('./config/db'); // Renamed for clarity
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const detailsSample = require('./data/details_sample.json');

const { getAllDetails } = require('./config/detailsService');
const { getAllratings } = require('./config/detailsService');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// get details sample
app.get('/api/details_sample', (req, res) => {
  res.json(detailsSample);
});

// Use getAllDetails function here
app.get('/api/details', (req, res) => {
  getAllDetails((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.get('/api/ratings', (req, res) => {
  getAllratings((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.listen(5000, () => console.log('Backend running on port 5000'));