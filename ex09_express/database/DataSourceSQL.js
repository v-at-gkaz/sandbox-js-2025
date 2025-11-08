import {exit, env, platform} from "node:process";
import {Sequelize} from "sequelize";
import {config} from "dotenv";
import readline from 'node:readline';

config();

const dbName = env.SUBD_DB_NAME || 'db';
const dbUser = env.SUBD_DB_USER || 'pguser';
const dbPass = env.SUBD_DB_PASS || 'pgPass';
const dbHost = env.SUBD_DB_HOST || 'localhost';
const dbDialect = env.SUBD_DB_DIALECT || 'postgres';


class DataSourceSQL {
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

        if (platform === "win32") {
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

            this.sequelize.query(`CREATE TABLE IF NOT EXISTS public.users (
                                                                              id serial4 NOT NULL PRIMARY KEY,
                                                                              "login" varchar(100) NOT NULL,
                password varchar(100) NOT NULL,
                CONSTRAINT login_uniq UNIQUE (login)
                )`).then(() => {
                console.log('Attempt to create database structure - success');
            }).catch(err => {
                console.log('Attempt to create database structure - error:', err);
            });

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
            throw error;
        }
    }

    async getOne(id) {
        try {
            const result = await this.sequelize.query(`select *
                                                       from public.users
                                                       where id = ${id}`);
            return {
                status: 'success',
                data: result[0][0]
            }
        } catch (error) {
            throw error;
        }
    }

    async add(user) {

        try {
            const result =
                await this.sequelize.query(`INSERT INTO public.users (login, password)
                                            VALUES ('${user.name}', '') RETURNING id, login "name"`);

            const created = result[0][0];

            return {
                status: 'success',
                data: created
            }
        } catch (error) {
            throw error;
        }
    }

    async edit(user, id) {
        try {

            const sqlQuery = [
                `UPDATE public.users
                 SET `
            ];

            const sqlSubQuery = [];

            if (user.name) {
                sqlSubQuery.push(`login='${user.name}'`);
            }
            if (user.password) {
                sqlSubQuery.push(`password='${user.password}'`);
            }

            sqlQuery.push(sqlSubQuery.join(', '));

            sqlQuery.push(` WHERE id=${id}`);
            sqlQuery.push(` RETURNING id, login "name"`);


            const result =
                await this.sequelize.query(sqlQuery.join(''));

            const updated = result[0][0];

            return {
                status: 'success',
                data: updated
            }

        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            await this.sequelize.query(`DELETE
                                        FROM public.users
                                        WHERE id = ${id};`);
            return {
                status: 'success'
            }
        } catch (error) {
            throw error;
        }
    }
}

const db = new DataSourceSQL();

export default db;