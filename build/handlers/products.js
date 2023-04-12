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
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const verifyAuthToken_1 = require("../middleware/verifyAuthToken");
const products = new products_1.ProductsModel();
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getproducts = yield products.index();
        res.status(200).send(getproducts);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const getSingleProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = _req.params.id;
    try {
        const product = yield products.show(productId);
        if (!product) {
            res.status(404).json(`No product with id ${productId} exists!`);
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const createproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_name, product_price } = req.body;
        const newproduct = yield products.create(req.body);
        res.status(200).send(newproduct);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const editproduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield products.show(_req.params.id);
        // Check if product exists
        if (!product) {
            res.status(404).json(`Product does not exist!`);
        }
        else {
            const productObject = {
                id: product.id,
                product_name: _req.body.product_name,
                product_price: _req.body.product_price
            };
            // update product
            const result = yield products.edit(productObject);
            console.log(result);
            res.status(200).json(result);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const deleteproduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = _req.params.id;
    try {
        const product = yield products.show(productId);
        // Check if product exists
        if (!product) {
            res.status(404).json(`Product with id ${productId} doesnot exist!`);
        }
        else {
            yield products.delete(productId);
            res.status(200).json(`product with id ${productId} succesfully deleted`);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const productRoutes = (app) => {
    app.get('/products', getAllProducts);
    app.get('/product/:id', getSingleProduct);
    app.post('/product', verifyAuthToken_1.verifyAuthToken, createproduct);
    app.put('/product/:id', verifyAuthToken_1.verifyAuthToken, editproduct);
    app.delete('/product/:id', verifyAuthToken_1.verifyAuthToken, deleteproduct);
};
exports.default = productRoutes;
