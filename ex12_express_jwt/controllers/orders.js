import createDebugMessages from 'debug';

const debug = createDebugMessages('ex12-express-jwt:controller-order');
import dbService from "../services/database.js";

class OrdersController {
    constructor(db) {
        this.db = db;
    }

    getAll = async (req, res) => {
        try {
            res.send(await this.db.Order.findAll());
        } catch (er) {
            res.status(500).send(er);
        }
    }

    getOne = async (req, res) => {
        try {
            const id = req.params.id;

            res.send(await this.db.OrderProduct.findAll({
                where: {orderId: id},
                include: [this.db.Product]
            }));

        } catch (er) {
            res.status(500).send(er.toString());
        }
    }

    getOneSQL = async (req, res) => {
        try {
            const id = req.params.id;
            const result = await this.db.sequelize.query(`select p.id        productId,
                                                                 p.name      productName,
                                                                 p.price     ProductPrice,
                                                                 op.quantity quantity
                                                          from orders o,
                                                               customers c,
                                                               products p,
                                                               order_product op
                                                          where o.customer_id = c.id
                                                            and o.id = op.order_id
                                                            and op.product_id = p.id
                                                            and o.id = ${id}`);
            res.send(result[0]);

        } catch (er) {
            res.status(500).send(er.toString());
        }
    }

    delete = async (req, res, next) => {
        try {
            if (!req.params.id) {
                throw {error: 'id is required'};
            }
            const id = req.params.id;
            await this.db.OrderProduct.destroy({where: {order_id: id}});
            await this.db.Order.destroy({where: {id}});
            res.status(204).send(null);
        } catch (er) {
            res.status(500).send(er);
        }
    }

}

const ordersController = new OrdersController(dbService);
export default ordersController;