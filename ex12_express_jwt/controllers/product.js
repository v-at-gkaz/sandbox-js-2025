import createDebugMessages from 'debug';
const debug = createDebugMessages('ex12-express-jwt:controller-product');
import dbService from "../services/database.js";

class ProductController {
    constructor(db) {
        this.db = db;
    }

    getAll = async (req, res) => {
        try {
            res.send(await this.db.Product.findAll());
        } catch (er) {
            res.status(500).send(er);
        }
    }

}
const productController = new ProductController(dbService);
export default productController;