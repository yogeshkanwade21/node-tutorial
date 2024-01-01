const express = require('express');
const app = express();
const userRouter = require('./routes/user');
const urlencoded = require('./middlewares');
const PORT = 4000;

// connecting to mongoDB
const connectMongoDb = require('./connection');
connectMongoDb('mongodb://127.0.0.1:27017/node-tutorial')
.then(() => {
    console.log('mongodb connection established');
});

//user Schema - moved to models
// model - moved to models

// middleware for processing form data
app.use(urlencoded());

// Router
app.use('/users', userRouter);

// server
const server = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

// checking server error
server.on('error', (err) =>{
    console.error(`server error: ${err.message}`);
});