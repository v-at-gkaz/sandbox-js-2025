import http from 'node:http';

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
    // Set the HTTP status code and content type
    res.writeHead(200, { 'Content-Type': 'text/html', 'My-Header': 'Hello, HTML' });

    console.log(req.headers);

    // Send the response body
    res.end('Hello, <b>World!</b>\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});