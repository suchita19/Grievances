const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'c##dev_test',
  password: 'test123',
  database: 'grievance_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the connection pool
module.exports = pool;