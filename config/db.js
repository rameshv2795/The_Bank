var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "jeffjack",
  database: "thebank"
});

module.exports = con;
