const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const authRoutes = require("./router/auth");
const grievanceRoutes = require("./router/grievances");
const chatRoutes = require("./router/chats");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'grievance_system'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/auth', authRoutes);
app.use('/grievances', grievanceRoutes);
app.use('/chat', chatRoutes);

// Socket.io setup remains the same...

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});