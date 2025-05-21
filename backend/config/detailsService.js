const conn = require('../config/db');

function getAllDetails(callback) {
  conn.query('SELECT * FROM details', callback);
}

function addData(table, data, callback) {
  conn.query('INSERT INTO ? SET ?', table, data, callback);
}

function getAllratings(callback) {
  conn.query('SELECT * FROM ratings', callback);
}

module.exports = { getAllDetails, getAllratings, addData };