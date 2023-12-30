const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} new req received \n`;
    // will be logged twice because server makes another request for favicon
    fs.appendFile('log.txt', log, (err, data) => {
        switch (req.url) {
            case '/':
                res.end('Hello from Server');
                break;
            case '/home':
                res.end('Hello from Home');
                break;
            case '/about':
                res.end('Hello from Yogesh');
                break;
            default:
                res.end('404 Not Found');
        }        
    });
});

myServer.listen(4000, () => {
    console.log('server started on port 4000');
});