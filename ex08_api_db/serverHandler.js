import {userController} from "./controllers/userController.js";
import {DataSource} from "./database/DataSource.js";
import {DataSourceSQL} from "./database/DataSourceSQL.js";
import {fileURLToPath} from "node:url";
import {dirname, join} from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __database_data_file_name = join(__dirname, "database", "database.json");
// console.log('debug >>> ', __database_data_file_name);

//const db = new DataSource(__database_data_file_name);
const db = new DataSourceSQL();

export const serverHandler = async (req, res) => {
    const {url, method} = req;

    console.log(`method: ${method}`);
    console.log(`url: ${url}`);

    if(url.startsWith("/user")) {
        await userController(req, res, db);
    } else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end(`PAGE NOT FOUND: ${url}`);
    }
}