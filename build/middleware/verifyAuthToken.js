"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWTToken = exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenSecret = process.env.TOKEN_SECRET;
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, tokenSecret);
        next();
        return;
    }
    catch (error) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }
};
exports.verifyAuthToken = verifyAuthToken;
const createJWTToken = (id, user_name) => {
    return jsonwebtoken_1.default.sign({ id, user_name }, tokenSecret);
};
exports.createJWTToken = createJWTToken;
