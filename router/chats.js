const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { grievanceId, message } = req.body;
    await req.db.promise().query(
      'INSERT INTO chat_messages (grievance_id, sender_id, message) VALUES (?, ?, ?)',
      [grievanceId, req.user.id, message]
    );
    res.status(201).json({ message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:grievanceId', auth, async (req, res) => {
    try {
      const [rows] = await req.db.promise().query(
        'SELECT * FROM chat_messages WHERE grievance_id = ? ORDER BY timestamps ASC',
        [req.params.grievanceId]
      );
  
      const messages = rows.map(row => ({
        sender: row.sender_id,
        message: row.message,
        timestamps: row.timestamps
      }));
  
      res.status(200).json({ messages });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

module.exports = router;