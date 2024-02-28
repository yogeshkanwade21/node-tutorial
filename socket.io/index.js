const express = require('express');
const { createServer } = require('node:http');
const { Server } = require("socket.io");
const PORT = 4001;

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send('./public/index.html');
})

// socket.io
io.on('connection', (socket) => {
    console.log('A new user connected', socket.id);
    socket.on('disconnect', () =>{
        console.log('User disconnected', socket.id);
    })
    socket.on('message', (message) => {
        // console.log('Message is:', message);
        io.emit('message', message);
    });
});

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});