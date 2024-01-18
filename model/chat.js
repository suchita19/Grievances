const db = require("../queries/db");

const createChatMessage = async (grievanceId, senderId, message) => {
  const [result] = await db.promise().query(
    'INSERT INTO chat_messages (grievance_id, sender_id, message) VALUES (?, ?, ?)',
    [grievanceId, senderId, message]
  );

  return result.insertId;
};

// Add more functions as needed

module.exports = {
  createChatMessage
  // Add other functions as needed
};