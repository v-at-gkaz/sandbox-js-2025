import createDebugMessages from 'debug';
const debug = createDebugMessages('ex12-express-jwt:controller-auth');
import databasePostgresService from "../services/database-postgres.js";
import jsonwebtoken from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'SuperPuperSecretDefault';
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h';

class AuthController {
    constructor(db) {
        this.db = db;
    }

    signIn = async (req, res) => {

        const { login, password } = req.body;

        const found = await this.db.User.findOne({
            where: {
                login,
                password
            }
        });

        if (!found) {
            return res.status(401).json({status: 'unauthorized'});
        }

        const payload = found.dataValues;
        delete payload.password;

        const jwt = jsonwebtoken.sign({payload}, jwtSecret, { expiresIn: jwtExpiresIn });

        res.status(200).send({auth: 'success', token: jwt});
    }

}
const authController = new AuthController(databasePostgresService);
export default authController;