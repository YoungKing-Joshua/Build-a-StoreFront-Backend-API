"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrdersModel {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Could not retrieve orders table: ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE id=($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not retrieve order of user id ${id}: ${error}`);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (order_status,user_id) VALUES($1, $2) RETURNING *';
                const result = yield conn.query(sql, [o.order_status, o.user_id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not add order of user id ${o.user_id}: ${error}`);
            }
        });
    }
    edit(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE orders SET user_id=($2), order_status=($3) WHERE id=($1) RETURNING *';
                const result = yield conn.query(sql, [o.id, o.user_id, o.order_status]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not update order id: ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not delete order id ${id}: ${error}`);
            }
        });
    }
    addProduct(order_id, product_id, order_product_quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO orders_products (order_id, product_id, order_product_quantity) VALUES($1, $2, $3) RETURNING *';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [order_id, product_id, order_product_quantity]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not add product to order ${err}`);
            }
        });
    }
    showOrdersProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders_products';
                const result = yield conn.query(sql);
                const order = result.rows;
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not retrieve ordered products`);
            }
        });
    }
}
exports.OrdersModel = OrdersModel;
