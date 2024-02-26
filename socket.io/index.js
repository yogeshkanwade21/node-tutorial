const express = require('express');
const { createServer } = require('node:http');
// const { Server } = require("socket.io");
const PORT = 4001;

const app = express();
const server = createServer(app);

app.use(express.static("public"));

app.get("/", (req, res) => {
    return res.send('./public/index.html');
})

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});