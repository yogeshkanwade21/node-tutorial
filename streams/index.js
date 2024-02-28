const express = require('express');
const fs = require('fs');
const status = require('express-status-monitor');
const PORT = 5000;

const app = express();

app.use(status());

app.get("/", (req, res) => {
    const stream = fs.createReadStream("./sample.txt", 'utf-8');
    stream.on('data', (chunk) => res.write(chunk));
    stream.on('end', () => res.end());
    // fs.readFile('./sample.txt', 'utf8', (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         res.status(500).send('Error reading the file');
    //         return;
    //     }
    //     res.send(data);
    // })
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});