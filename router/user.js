// const express = require('express');
// const router = express.Router();
// const userModel = require("../model/user");

// router.post('/create', async (req, res) => {
//   try {
//     const { username, password, role } = req.body;
//     const userId = await userModel.createUser(username, password, role);
//     res.status(201).json({ userId });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });


const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your MySQL connection module

router.get('/users', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM users');
    res.json({ users: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;