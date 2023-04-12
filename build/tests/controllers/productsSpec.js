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
const products_1 = require("../../models/products");
const users_1 = require("../../models/users");
const database_1 = __importDefault(require("../../database"));
const request = (0, supertest_1.default)(server_1.default);
const testProduct = new products_1.ProductsModel();
describe('Testing Products Endpoints.', () => {
    const product = {
        product_name: 'New product 1',
        product_price: 200
    };
    const user = {
        user_name: 'User Name',
        first_name: 'First Name',
        last_name: 'Last Name',
        password: 'userpassword'
    };
    const testUser = new users_1.UsersModel();
    const token = jsonwebtoken_1.default.sign(user, process.env.TOKEN_SECRET);
    function Truncate() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = `TRUNCATE TABLE orders_products , orders , users , products RESTART IDENTITY;`;
            yield conn.query(sql);
            conn.release();
        });
    }
    it('GET /products should show all users', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testProduct.create(product);
        const response = yield request.get('/products').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        yield Truncate();
    }));
    it('GET /product/:id should show specific user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testProduct.create(product);
        const response = yield request.get('/product/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        yield Truncate();
    }));
    it('POST /product should create a product', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testProduct.create(product);
        const response = yield request
            .post('/product')
            .set('Authorization', `Bearer ${token}`)
            .send(product);
        expect(response.status).toBe(200);
        yield Truncate();
    }));
    it('PUT /product/:id should edit a product', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testUser.create(user);
        yield testProduct.create(product);
        const editedUser = {
            product_name: 'New Product 2',
            product_price: 250
        };
        const response = yield request
            .put('/product/1')
            .set('Authorization', `Bearer ${token}`)
            .send(editedUser);
        expect(response.status).toBe(200);
        yield Truncate();
    }));
    it('DELETE /product should create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testUser.create(user);
        yield testProduct.create(product);
        const newProduct = {
            id: 1
        };
        const response = yield request
            .delete('/product/1')
            .set('Authorization', `Bearer ${token}`)
            .send(newProduct);
        expect(response.status).toBe(200);
        yield Truncate();
    }));
});
