const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');


router.post('/', auth, authorize('employee'), async (req, res) => {
  try {
    const { details } = req.body;
    const resolutionWindow = new Date();
    resolutionWindow.setHours(resolutionWindow.getHours() + 24);

    const [result] = await req.db.promise().query(
      'INSERT INTO grievances (employee_id, status, details, resolution_window) VALUES (?, ?, ?, ?)',
      [req.user.id, 'open', details, resolutionWindow]
    );

    const grievanceId = result.insertId;
    res.status(201).json({ grievanceId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;