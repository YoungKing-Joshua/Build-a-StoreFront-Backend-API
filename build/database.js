"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, ENV, POSTGRES_DB_TEST, } = process.env;
let poolConfig;
if (ENV === 'dev') {
    poolConfig = {
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
    };
}
else if (ENV === 'test') {
    poolConfig = {
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB_TEST,
    };
}
else {
    throw new Error('Invalid environment');
}
const client = new pg_1.Pool(poolConfig);
exports.default = client;
