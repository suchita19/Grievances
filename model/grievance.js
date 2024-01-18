const db = require("../queries/db");

const createGrievance = async (employeeId, status, details, resolutionWindow) => {
  const [result] = await db.promise().query(
    'INSERT INTO grievances (employee_id, status, details, resolutionWindow) VALUES (?, ?, ?, ?)',
    [employeeId, status, details, resolutionWindow]
  );

  return result.insertId;
};

// Add more functions as needed

module.exports = {
  createGrievance
  // Add other functions as needed
};