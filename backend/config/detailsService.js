const conn = require('../config/db');

function getAllDetails(callback) {
  conn.query('SELECT * FROM details', callback);
}

/* function addDetail(data, callback) {
  conn.query('INSERT INTO details SET ?', data, callback);
} */

function getAllratings(callback) {
  conn.query('SELECT * FROM ratings', callback);
}

module.exports = { getAllDetails, getAllratings };