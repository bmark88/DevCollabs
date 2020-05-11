require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const http = require('http');
const socketio = require('socket.io');


app.use(bodyParser.json())
app.use(cors());

const PORT = 3001;

const server = http.createServer(app);
const io = socketio(server);

const { Pool } = require('pg')
const dbParams = {
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
 }
const db = new Pool(dbParams);

const indexRoutes = require('./routes/index.ts')
const groupRoutes = require('./routes/group.ts')

app.use("/", indexRoutes(db));
app.use("/group", groupRoutes(db))

const users = [];
let userCount = 0;

io.on('connection', (socket) => {
  //user
  console.log("user has connected!");
  userCount += 1;
  let temp = `User ${userCount}`
  users.push(temp);
  socket.emit('intial', {user: temp, users});
  socket.user = temp;
  io.emit('users', {users})

  //message
  socket.on('message', (data) => {
      console.log(data);
      io.emit('message', data);
  })

  //disconnect
  socket.on('disconnect', () => {
      console.log(socket.user);
      let pos = users.map(user => user.username).indexOf(socket.user.username);
      users.splice(pos, 1);
      io.emit('users', {users})
      console.log('user disconnected');
  })
})


server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
