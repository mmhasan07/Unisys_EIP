// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "password",
    database:"test",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

module.exports = connection;
