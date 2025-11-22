import createDebugMessages from 'debug';
const debug = createDebugMessages('ex12-express-jwt:controller-user');
import databasePostgresService from "../services/database-postgres.js";

class UsersController {
    constructor(db) {
        this.db = db;
    }

    getOneOrGetAll = async (req, res) => {

        debug('user from req (users controller)', req.user);

        if (req.query.id) {
            await this.getOneById(req, res, req.query.id);
            return;
        }
        await this.getAll(req, res);
    }

    getAll = async (req, res) => {
        try {
            const re = await this.db.getAll();
            res.send(re);
        } catch (er) {
            res.status(500).send(er);
        }
    }

    getOne = async (req, res) => {
        await this.getOneById(req, res, req.params.id);
    }

    getOneById = async (req, res, id) => {
        try {
            const re = await this.db.getOne(id);
            res.send(re);
        } catch (er) {
            res.status(500).send(er);
        }
    }

    add = async (req, res, next) => {
        // var 1
        /*this.db.add(req.body).then((re)=>{
            res.status(201).send(re);
        }).catch((er) => {
            res.status(500).send(er);
        });*/

        // var 2
        try {
            const re = await this.db.add(req.body);
            res.status(201).send(re);
        } catch (er) {
            res.status(500).send(er);
        }
    }

    edit = async (req, res, next) => {
        try {

            if (!(req.query.id || req.params.id)) {
                throw {error: 'id is required'};
            }

            if (!(req.body.name || req.body.password)) {
                throw {error: 'body fields "name" or "password" is required'};
            }

            const id = req.params.id ? req.params.id : req.query.id;
            await this.db.edit(req.body, id)
            res.status(201).send(await this.db.getOne(id));
        } catch (er) {
            res.status(500).send(er);
        }
    }

    delete = async (req, res, next) => {
        try {
            if (!(req.query.id || req.params.id)) {
                throw {error: 'id is required'};
            }
            const id = req.params.id ? req.params.id : req.query.id;
            await this.db.delete(id);
            res.status(204).send(null);
        } catch (er) {
            //!
            res.status(500).send(er);
        }

    }

}
const usersController = new UsersController(databasePostgresService);
export default usersController;