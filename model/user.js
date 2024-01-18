const db = require("../queries/db"); 

const createUser = async (username, password, role) => {
  const [result] = await db.promise().query(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    [username, password, role]
  );

  return result.insertId;
};



module.exports = {
  createUser
  
};