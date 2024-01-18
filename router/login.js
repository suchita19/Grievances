const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router =new express.Router();

// Secret key for JWT
const secretKey = 'yourSecretKey'; // Replace with a strong secret key

// MySQL connection
const mysql = require('mysql');
const dbConfig = {
  host: 'localhost',
  user: 'c##dev_test',
  password: 'test123',
  database: 'test'
};
const connection = mysql.createConnection(dbConfig);

// User model (Assuming you have a 'users' table with 'username', 'password', 'role' columns)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user by username in MySQL
  const query = 'SELECT * FROM users WHERE username = ?';
  connection.query(query, [username], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    const user = results[0];
    // console.log('user',user)
    // Check if user exists and password is correct
    if (user && bcrypt.compareSync(password, user.password)) {
      // Generate JWT
      const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

module.exports = router;