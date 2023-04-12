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
const orders_1 = require("../../models/orders");
const users_1 = require("../../models/users");
const products_1 = require("../../models/products");
const database_1 = __importDefault(require("../../database"));
const testOrder = new orders_1.OrdersModel();
const testUser = new users_1.UsersModel();
const testProduct = new products_1.ProductsModel();
describe('Order Model', () => {
    describe('Test methods exists', () => {
        it('index method should be defined', () => {
            expect(testOrder.index).toBeDefined();
        });
        it('show method should be defined', () => {
            expect(testOrder.show).toBeDefined();
        });
        it('create method should be defined', () => {
            expect(testOrder.create).toBeDefined();
        });
        it('edit method should be defined', () => {
            expect(testOrder.edit).toBeDefined();
        });
        it('delete method should be defined', () => {
            expect(testOrder.delete).toBeDefined();
        });
    });
    describe('Test Order model logic', () => {
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
        function Truncate() {
            return __awaiter(this, void 0, void 0, function* () {
                const conn = yield database_1.default.connect();
                const sql = `TRUNCATE TABLE orders_products , orders , users , products RESTART IDENTITY;`;
                yield conn.query(sql);
                conn.release();
            });
        }
        it('should create an order', () => __awaiter(void 0, void 0, void 0, function* () {
            yield testUser.create(user);
            yield testOrder.create(order);
            yield testProduct.create(product);
            const createdOrder = yield testOrder.create(order);
            expect(createdOrder.order_status).toBe(order.order_status);
            expect(createdOrder.user_id).toBe(order.user_id);
            yield Truncate();
        }));
        it('index method should show all orders in db', () => __awaiter(void 0, void 0, void 0, function* () {
            yield testUser.create(user);
            yield testOrder.create(order);
            yield testProduct.create(product);
            const createdOrder = yield testOrder.index();
            expect(createdOrder.length).toBeGreaterThan(0);
            yield Truncate();
            yield Truncate();
        }));
        it('show method should show an Order with id specified', () => __awaiter(void 0, void 0, void 0, function* () {
            yield testUser.create(user);
            yield testOrder.create(order);
            const allOrders = yield testOrder.index();
            const addedOrderId = allOrders[0].id;
            yield testProduct.create(product);
            const createdOrder = yield testOrder.show(addedOrderId);
            expect(createdOrder.order_status).toBe(order.order_status);
            expect(createdOrder.user_id).toBe(order.user_id);
            yield Truncate();
        }));
        it('edit method should edit an Order', () => __awaiter(void 0, void 0, void 0, function* () {
            yield testUser.create(user);
            yield testOrder.create(order);
            yield testProduct.create(product);
            const editedOrder = {
                order_status: 'complete',
                user_id: 1
            };
            yield testOrder.edit(editedOrder);
            const allOrders = yield testOrder.index();
            const addedOrderId = allOrders[0].id;
            const newResult = yield testOrder.show(addedOrderId);
            expect(order.order_status).toBe(newResult.order_status);
            expect(order.user_id).toBe(newResult.user_id);
            yield Truncate();
        }));
        it('delete method should delete product with id specified', () => __awaiter(void 0, void 0, void 0, function* () {
            yield testUser.create(user);
            yield testOrder.create(order);
            yield testProduct.create(product);
            yield testOrder.create(order);
            const allOrders = yield testOrder.index();
            const addedOrderId = allOrders[0].id;
            yield testOrder.delete(addedOrderId);
            expect(order.order_status).toBeNull;
            expect(order.user_id).toBeNull;
            yield Truncate();
        }));
        it('add product to order', () => __awaiter(void 0, void 0, void 0, function* () {
            yield testUser.create(user);
            const allUsers = yield testUser.index();
            const addedUserId = allUsers[0].id;
            yield testOrder.create(order);
            const allOrders = yield testOrder.index();
            const addedOrderId = allOrders[0].id;
            yield testProduct.create(product);
            yield testOrder.index();
            const addedProductId = allOrders[0].id;
            yield testOrder.addProduct(addedOrderId, addedProductId, addedUserId);
            const resultOP = yield testOrder.showOrdersProducts();
            expect(resultOP.length).toBeGreaterThan(0);
            yield Truncate();
        }));
    });
});
