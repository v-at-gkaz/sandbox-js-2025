import http from "node:http";
import {env} from "node:process";
import {serverHandler} from "./serverHandler.js";
import * as dotenv from "dotenv";
dotenv.config();

const hostname = "0.0.0.0";
const port = +env.PORT || 3000;

const server = http.createServer(serverHandler);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});