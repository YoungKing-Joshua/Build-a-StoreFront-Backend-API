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
const products_1 = require("../../models/products");
const database_1 = __importDefault(require("../../database"));
const testProduct = new products_1.ProductsModel();
describe('Product Model', () => {
    describe('Test methods exists', () => {
        it('index method should be defined', () => {
            expect(testProduct.index).toBeDefined();
        });
        it('show method should be defined', () => {
            expect(testProduct.show).toBeDefined();
        });
        it('create method should be defined', () => {
            expect(testProduct.create).toBeDefined();
        });
        it('edit method should be defined', () => {
            expect(testProduct.edit).toBeDefined();
        });
        it('delete method should be defined', () => {
            expect(testProduct.delete).toBeDefined();
        });
    });
    describe('Test Product model logic', () => {
        const product = {
            product_name: 'New Product 1',
            product_price: 200
        };
        function Truncate() {
            return __awaiter(this, void 0, void 0, function* () {
                const conn = yield database_1.default.connect();
                const sql = `TRUNCATE TABLE orders_products , orders , users , products RESTART IDENTITY;`;
                yield conn.query(sql);
                conn.release();
            });
        }
        it('should create a Product', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdProduct = yield testProduct.create(product);
            if (createdProduct) {
                expect(createdProduct.product_name).toBe(product.product_name);
                expect(createdProduct.product_price).toBe(product.product_price);
            }
            yield Truncate();
        }));
        it('index method should show all users in db', () => __awaiter(void 0, void 0, void 0, function* () {
            yield testProduct.create(product);
            const allProducts = yield testProduct.index();
            expect(allProducts.length).toBeGreaterThan(0);
            yield Truncate();
        }));
        it('show method should show a product with id specified', () => __awaiter(void 0, void 0, void 0, function* () {
            yield testProduct.create(product);
            const allProducts = yield testProduct.index();
            const addedProductId = allProducts[0].id;
            const result = yield testProduct.show(addedProductId);
            expect(product.product_name).toBe(result.product_name);
            expect(product.product_price).toBe(result.product_price);
            yield Truncate();
        }));
        it('edit method should edit a product', () => __awaiter(void 0, void 0, void 0, function* () {
            yield testProduct.create(product);
            const editedProduct = {
                product_name: 'New Product 2',
                product_price: 400
            };
            yield testProduct.edit(editedProduct);
            const allProducts = yield testProduct.index();
            const addedProductId = allProducts[0].id;
            const newResult = yield testProduct.show(addedProductId);
            expect(product.product_name).toBe(newResult.product_name);
            expect(product.product_price).toBe(newResult.product_price);
            yield Truncate();
        }));
        it('delete method should delete product with id specified', () => __awaiter(void 0, void 0, void 0, function* () {
            yield testProduct.create(product);
            const allProducts = yield testProduct.index();
            const addedProductId = allProducts[0].id;
            yield testProduct.delete(addedProductId);
            expect(product.product_name).toBeNull;
            expect(product.product_price).toBeNull;
            yield Truncate();
        }));
    });
});
