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
const orders_1 = require("../models/orders");
const verifyAuthToken_1 = require("../middleware/verifyAuthToken");
const users_1 = require("../models/users");
const orders = new orders_1.OrdersModel();
const users = new users_1.UsersModel();
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getOrders = yield orders.index();
        res.status(200).send(getOrders);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const getSingleOrder = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orders.show(_req.params.id);
        if (!order) {
            res.status(404).json(`No order with this user id exists!`);
        }
        res.status(200).json(order);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.user_id;
    try {
        const user = yield users.show(userId);
        if (!user) {
            res.status(404).json(`User with id ${userId} does not exist!`);
        }
        else {
            const { order_status, user_id } = req.body;
            const newOrder = yield orders.create(req.body);
            res.status(200).send(newOrder);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const editOrder = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orders.show(_req.params.id);
        // Check if order exists
        if (!order) {
            res.status(404).json(`Order does not exist!`);
        }
        else {
            const orderObject = {
                id: order.id,
                order_status: _req.body.order_status,
                user_id: _req.body.user_id
            };
            // Update order
            const result = yield orders.edit(orderObject);
            res.status(200).json(result);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const deleteOrder = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = _req.params.id;
    try {
        const order = yield orders.show(orderId);
        // Check if order exists
        if (!order) {
            res.status(404).json(`Order with id ${orderId} does not exist!`);
        }
        else {
            yield orders.delete(orderId);
            res.status(200).json(`Order with id ${orderId} succesfully deleted`);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const addProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order_id = _req.params.id;
    const product_id = _req.body.product_id;
    const order_product_quantity = parseInt(_req.body.order_product_quantity);
    try {
        const addedProduct = yield orders.addProduct(order_id, product_id, order_product_quantity);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const showOrdersProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getOrders = yield orders.showOrdersProducts();
        res.status(200).send(getOrders);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const ordersRoutes = (app) => {
    app.get('/orders', verifyAuthToken_1.verifyAuthToken, getAllOrders);
    app.get('/order/:id', verifyAuthToken_1.verifyAuthToken, getSingleOrder);
    app.post('/order', verifyAuthToken_1.verifyAuthToken, createOrder);
    app.put('/order/:id', verifyAuthToken_1.verifyAuthToken, editOrder);
    app.delete('/order/:id', verifyAuthToken_1.verifyAuthToken, deleteOrder);
    // Add product in existing order
    app.post('/orders/:id/products', verifyAuthToken_1.verifyAuthToken, addProduct);
    // Show ordered product in existing order
    app.get('/orders/orderedproducts', verifyAuthToken_1.verifyAuthToken, showOrdersProducts);
};
exports.default = ordersRoutes;
