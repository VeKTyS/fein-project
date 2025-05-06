const express = require('express');
const cors = require('cors');
const app = express();
const detailsSample = require('./data/details_sample.json');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// get details sample
app.get('/api/details_sample', (req, res) => {
  res.json(detailsSample);
});

app.listen(5000, () => console.log('Backend running on port 5000'));