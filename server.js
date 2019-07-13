const http = require('http');
const fs = require('fs');
const path = require('path');

const init = (port = 3000) => {
    const server = http.createServer((req, res) => {
        if (req.method === 'GET') {
            let filepath = path.join(__dirname, 'index.html');
            if (req.url !== '/') {
                filepath = path.join(__dirname, req.url);
            }

            let status = 200;
            try {
                file = fs.readFileSync(filepath, { encoding: 'utf8' });
            } catch (error) {
                status = 404;
                file = `Not Found`;
            }

            res.writeHead(status, { 'Content-Type': 'text/html' });
            res.end(file);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    });

    server.on('clientError', (err, socket) => {
        socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    });

    server.listen(port);
}

init(8080);