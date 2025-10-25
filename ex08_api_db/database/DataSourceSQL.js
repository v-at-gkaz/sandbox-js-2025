import {exit, env, platform} from "node:process";
import {readFileSync, writeFileSync, existsSync} from "node:fs";
import {Sequelize} from "sequelize";
import {config} from "dotenv";
import readline from 'node:readline';
config();

const dbName = env.SUBD_DB_NAME || 'db';
const dbUser = env.SUBD_DB_USER || 'pguser';
const dbPass = env.SUBD_DB_PASS || 'pgPass';
const dbHost = env.SUBD_DB_HOST || 'localhost';
const dbDialect = env.SUBD_DB_DIALECT || 'postgres';


export class DataSourceSQL {
    sequelize = new Sequelize(
        dbName,
        dbUser,
        dbPass,
        {
            host: dbHost,
            dialect: dbDialect
        }
    );
    data = [];
    constructor() {
        if(platform === "win32") {
            const rl = readline.createInterface({
                input: stdin,
                output: stdout
            });

            rl.on("SIGINT", () => {
                process.emit("SIGINT");
            });
        }

        process.on("SIGINT", async () => {
            try {
                await this.sequelize.close();
                console.log('Disconnected From DB Success');
                exit(0);
            } catch (error) {
                console.error('Disconnected From DB Error:', error);
                exit(1);
            }
        });


        this.sequelize.authenticate().then(() => {
            console.log('Connection With Database Established Successfully.');
        }).catch((error) => {
            console.error('Sequelize Connection Error:', error);
            exit(2);
        });

    }

    async getAll() {
        try {
            const result = await this.sequelize.query('select * from public.users');
            return {
                status: 'success',
                data: result[0]
            }
        } catch (error) {
            return {
                status: 'error',
                data: error
            };
        }
    }

    getOne(id) {
        const found = this.data.find(itm =>{
            return +itm.id === +id;
        });
        if(found) {
            return found;
        }
        return false;
    }

    add(user) {

        let id= 1;
        if(this.data.length){
            const objectWithMaxId = this.data.reduce((maxObj, currentObj) => {
                return (currentObj.id > maxObj.id) ? currentObj : maxObj;
            });
            id = objectWithMaxId.id + 1;
        }

        const newUser = {...user, id};
        this.data.push(newUser);
        this._save();
        return newUser;
    }

    edit(user, id) {
        let updatedUser;
        for (let index = 0; index < this.data.length; index++) {
            const element = this.data[index];
            if(element.id === id) {
                this.data[index] = user;
                updatedUser = this.data[index];
                this._save();
                return updatedUser;
            }
        }
        return false;
    }

    delete(id) {
        this.data = this.data.filter(itm=>{
            return +itm.id !== +id;
        });
        this._save();
        return true;
    }

    _load(){
        try {
            this.data = JSON.parse(readFileSync(this.fileName));
        } catch(e) {
            console.error(e);
            exit(-1);
        }
    }

    _save(){
        try {
            writeFileSync(this.fileName, JSON.stringify(this.data));
        } catch(e) {
            console.error(e);
            exit(-1);
        }
    }
}