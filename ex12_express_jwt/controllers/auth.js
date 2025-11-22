import createDebugMessages from 'debug';

const debug = createDebugMessages('ex12-express-jwt:controller-auth');
import databasePostgresService from "../services/database.js";
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from "bcrypt";

const jwtSecret = process.env.JWT_SECRET || 'SuperPuperSecretDefault';
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h';

class AuthController {
    constructor(db) {
        this.db = db;
    }

    signIn = async (req, res) => {

        const {login, password} = req.body;

        const found = await this.db.User.findOne({
            where: {
                login
            }
        });

        if (!found) {
            return res.status(401).json({status: 'unauthorized'});
        }

        const payload = found.dataValues;
        const passwordHash = payload.password;

        try {
            if (await bcrypt.compare(password, passwordHash)) {
                const jwt = jsonwebtoken.sign({payload}, jwtSecret, {expiresIn: jwtExpiresIn});
                return res.status(200).send({auth: 'success', token: jwt});
            }
            return res.status(401).json({status: 'unauthorized'});
        } catch (e) {
            res.status(500).send({error: e.toString()});
        }
    }

    signUp = async (req, res) => {

        const {login, password} = req.body;
        const found = await this.db.User.findOne({
            where: {
                login
            }
        });

        debug('found', found);

        if (found) {
            return res.status(406).json({status: 'User already exists'});
        }

        try {
            const passwordHash = bcrypt.hashSync(password, 10);
            const re = await this.db.User.create({login, password: passwordHash});
            res.status(201).send({login: re.login, id: re.id});
        } catch (e) {
            res.status(500).send({error: e.toString()});
        }
    }

}

const authController = new AuthController(databasePostgresService);
export default authController;