import {exit, env, platform} from "node:process";
import {Sequelize, DataTypes} from "sequelize";
import {config} from "dotenv";
import readline from 'node:readline';
import createDebugMessages from 'debug';
const debug = createDebugMessages('ex12-express-jwt:database');

config();

const dbName = env.SUBD_DB_NAME || 'db';
const dbUser = env.SUBD_DB_USER || 'pguser';
const dbPass = env.SUBD_DB_PASS || 'pgPass';
const dbHost = env.SUBD_DB_HOST || 'localhost';
const dbDialect = env.SUBD_DB_DIALECT || 'postgres';
const dbSync = (env.SUBD_DB_SYNC || 'no') === 'yes';


debug(dbSync, env.SUBD_DB_SYNC);

class DataSource {
    sequelize = new Sequelize(
        dbName,
        dbUser,
        dbPass,
        {
            host: dbHost,
            dialect: dbDialect,
            define: {
                underscored: true,
            }
        }
    );

    User = this.sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'users',
        timestamps: false,
        // freezeTableName: true,
    });

    Customer = this.sequelize.define('Customer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.CHAR(255),
            allowNull: false
        },
        email: {
            type: DataTypes.CHAR(128),
            unique: true
        }
    }, {
        tableName: 'customers',
        timestamps: false,
        // freezeTableName: true,
    });

    Product = this.sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT(10,2),
            allowNull: false
        }
    }, {
        tableName: 'products',
        timestamps: false,
        // freezeTableName: true,
    });

    Order = this.sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'customers',
                key: 'id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        },
    }, {
        tableName: 'orders',
        timestamps: false,
        // freezeTableName: true,
    });

    OrderProduct = this.sequelize.define('OrderProduct', {
        orderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'orders',
                key: 'id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'products',
                key: 'id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        }
    }, {
        tableName: 'order_product',
        timestamps: false,
        // freezeTableName: true,
    });


    constructor() {

        this.Product.hasMany(this.OrderProduct, {
            foreignKey: 'productId'
        });

        this.OrderProduct.belongsTo(this.Product, {foreignKey: 'productId'});

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
            if(dbSync){
                this.sequelize.sync({force: true});
            }
        }).catch((error) => {
            console.error('Sequelize Connection Error:', error);
            exit(2);
        });
    }

    async getAll() {
       try {
            const result = await this.User.findAll();
            return {
                status: 'success',
                data: result
            }
        } catch (error) {
            throw error;
        }

    }

    async getOne(id) {
        try {
            const result = await this.User.findOne({where: {id}});
            return {
                status: 'success',
                data: result
            }
        } catch (error) {
            throw error;
        }
    }

    async add(user) {
        try {

            const created = await this.User.create({
                login: user.name,
            });

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
            const payload = {};

            if (user.name) {
                payload.login = user.name;
            }

            if (user.password) {
                payload.password = user.password;
            }

            const updated = await this.User.update(payload, {where: {id}});

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
            await this.User.destroy({where: {id}});
        } catch (error) {
            throw error;
        }
    }
}

const dbService = new DataSource();

export default dbService;