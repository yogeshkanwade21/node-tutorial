const cluster = require('node:cluster');
const os = require('os');
const express = require('express');
const PORT = 5000;

const app = express();

const totalCPUs = os.cpus().length;
// console.log(totalCPUs);

if(cluster.isPrimary) {
    console.log(`Primary process pid= ${process.pid} running`);

    // fork workers
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }
} else {

    app.get("/", (req, res) => {
        res.json({message : `Hello from server ${process.pid}`});
    })

    app.listen(PORT, () => {
        console.log(`listening on port ${PORT} & ${process.pid}`);
    });
}
