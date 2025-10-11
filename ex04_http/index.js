import http from 'node:http';
import {serverHandler} from "./serverHandler.js";

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer(serverHandler);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});