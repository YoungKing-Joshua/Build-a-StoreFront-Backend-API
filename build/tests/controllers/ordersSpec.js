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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const orders_1 = require("../../models/orders");
const users_1 = require("../../models/users");
const products_1 = require("../../models/products");
const database_1 = __importDefault(require("../../database"));
const request = (0, supertest_1.default)(server_1.default);
const testOrder = new orders_1.OrdersModel();
const testUser = new users_1.UsersModel();
const testProduct = new products_1.ProductsModel();
describe('Testing Orders Endpoints.', () => {
    const order = {
        order_status: 'active',
        user_id: 1
    };
    const product = {
        product_name: 'New Product 1',
        product_price: 200
    };
    const user = {
        user_name: 'User Name',
        first_name: 'First Name',
        last_name: 'Last Name',
        password: 'userpassword'
    };
    const token = jsonwebtoken_1.default.sign(user, process.env.TOKEN_SECRET);
    function Truncate() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = `TRUNCATE TABLE orders_products , orders , users , products RESTART IDENTITY;`;
            yield conn.query(sql);
            conn.release();
        });
    }
    it('GET /orders should show all users', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testUser.create(user);
        yield testOrder.create(order);
        yield testProduct.create(product);
        yield testOrder.create(order);
        const response = yield request.get('/orders').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        yield Truncate();
    }));
    it('GET /order/:id should show specific order', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testUser.create(user);
        yield testOrder.create(order);
        const response = yield request.get('/order/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        yield Truncate();
    }));
    it('POST /order should create a order', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testUser.create(user);
        yield testOrder.create(order);
        const response = yield request
            .post('/order')
            .set('Authorization', `Bearer ${token}`)
            .send(order);
        expect(response.status).toBe(200);
        yield Truncate();
    }));
    it('PUT /order/:id should edit a order', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testUser.create(user);
        yield testOrder.create(order);
        yield testProduct.create(product);
        const editedOrder = {
            order_status: 'complete',
            user_id: 1
        };
        const response = yield request
            .put('/order/1')
            .set('Authorization', `Bearer ${token}`)
            .send(editedOrder);
        expect(response.status).toBe(200);
        yield Truncate();
    }));
    it('DELETE /order/:id should create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testUser.create(user);
        yield testOrder.create(order);
        yield testProduct.create(product);
        const response = yield request.delete('/order/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        yield Truncate();
    }));
});
