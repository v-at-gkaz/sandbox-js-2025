import {userController} from "./controllers/userController.js";

export const serverHandler = (req, res) => {
    const {url, method} = req;

    console.log(`method: ${method}`);
    console.log(`url: ${url}`);

    if(url.startsWith("/user")) {
        userController(req, res);
    } else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end(`PAGE NOT FOUND: ${url}`);
    }
}