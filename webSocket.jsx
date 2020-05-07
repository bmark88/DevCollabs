const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');

const PORT = 3001;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const users = [];
let userCount = 0;

app.get('/test', (req,res) => {
    res.send("OK");
})

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


app.use(cors());

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));