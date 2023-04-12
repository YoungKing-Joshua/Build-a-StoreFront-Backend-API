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
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken_1 = require("../middleware/verifyAuthToken");
const users = new users_1.UsersModel();
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUsers = yield users.index();
        res.status(200).send(getUsers);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const getSingleUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = _req.params.id;
    try {
        const user = yield users.show(userId);
        if (!user) {
            res.status(404).json(`No user with id ${userId} exists!`);
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_name, first_name, last_name, password } = req.body;
        const newUser = yield users.create(req.body);
        const token = jsonwebtoken_1.default.sign(newUser, process.env.TOKEN_SECRET);
        res.status(200).json(token);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.id;
    try {
        const user = yield users.show(userId);
        // Check if user exists
        if (!user) {
            res.status(404).json(`User with id ${userId} does not exist!`);
        }
        else {
            const { id, user_name, first_name, last_name, password } = req.body;
            // update user
            const editedUser = yield users.edit(req.body);
            //   console.log(result)
            res.status(200).json(editedUser);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const deleteUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = _req.body.id;
    try {
        const user = yield users.show(userId);
        // Check if user exists
        if (!user) {
            res.status(404).json(`User with id ${userId} doesnot exist!`);
        }
        else {
            yield users.delete(userId);
            res.status(200).json(`User with id ${userId} succesfully deleted`);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const userRoutes = (app) => {
    app.get('/users', verifyAuthToken_1.verifyAuthToken, getAllUsers);
    app.get('/user/:id', verifyAuthToken_1.verifyAuthToken, getSingleUser);
    app.post('/user', createUser);
    app.put('/user', verifyAuthToken_1.verifyAuthToken, editUser);
    app.delete('/user', verifyAuthToken_1.verifyAuthToken, deleteUser);
};
exports.default = userRoutes;
