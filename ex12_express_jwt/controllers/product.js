import createDebugMessages from 'debug';
const debug = createDebugMessages('ex12-express-jwt:controller-product');
import databasePostgresService from "../services/database-postgres.js";
import jsonwebtoken from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'SuperPuperSecretDefault';

class ProductController {
    constructor(db) {
        this.db = db;
    }

    getAll = async (req, res) => {

        let jwt = req.headers.authorization;
        jwt = jwt.split(' ');
        jwt = jwt[1];

        jsonwebtoken.verify(jwt, jwtSecret, (err, decoded) => {
            if (err) {
                debug('decoded jwt error >>> ', err);
                return res.status(403).send({message: 'Access denied' });
            }
            debug('decoded jwt >>> ', decoded);
            // FIXME: read from DB!
            return res.status(200).send({status: 'success', data: [{id: 0, product: "name 1"}, {id: 0, product: "name 1"}]});
        });
    }

}
const productController = new ProductController(databasePostgresService);
export default productController;