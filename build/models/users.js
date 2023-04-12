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
exports.UsersModel = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UsersModel {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Could not retrieve users: ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT id, user_name, first_name, last_name FROM users WHERE id=($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not retrieve user with id ${id}: ${error}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users (user_name, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *';
                const hash = bcrypt_1.default.hashSync(u.password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS));
                const result = yield conn.query(sql, [u.user_name, u.first_name, u.last_name, hash]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not add user ${u.user_name}. Error: ${error}`);
            }
        });
    }
    edit(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE users SET user_name=($2), first_name=($3), last_name=($4), password=($5)  WHERE id=($1) RETURNING id, user_name, first_name, last_name';
                const hashPassword = bcrypt_1.default.hashSync(u.password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS));
                const result = yield conn.query(sql, [
                    u.id,
                    u.user_name,
                    u.first_name,
                    u.last_name,
                    hashPassword
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not update user with id ${u.id}: ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM users WHERE id=($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not delete user with id ${id}: ${error}`);
            }
        });
    }
}
exports.UsersModel = UsersModel;
