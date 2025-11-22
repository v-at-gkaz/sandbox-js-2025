import createDebugMessages from 'debug';
const debug = createDebugMessages('ex12-express-jwt:controller-product');
import databasePostgresService from "../services/database.js";

class ProductController {
    constructor(db) {
        this.db = db;
    }

    getAll = async (req, res) => {

            debug('user from req', req.user);

            // FIXME: read from DB!
            return res.status(200).send({status: 'success', data: [{id: 0, product: "name 1"}, {id: 0, product: "name 1"}]});
    }

}
const productController = new ProductController(databasePostgresService);
export default productController;