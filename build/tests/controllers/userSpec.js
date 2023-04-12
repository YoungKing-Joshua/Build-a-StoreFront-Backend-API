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
const users_1 = require("../../models/users");
const database_1 = __importDefault(require("../../database"));
const request = (0, supertest_1.default)(server_1.default);
const testUser = new users_1.UsersModel();
describe('Testing Users Endpoints.', () => {
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
    it('GET /user should show all users', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testUser.create(user);
        const response = yield request.get('/users').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        yield Truncate();
    }));
    it('GET /user/:id should show all users', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testUser.create(user);
        const response = yield request.get('/user/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        yield Truncate();
    }));
    it('POST /user should create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/user').set('Authorization', `Bearer ${token}`).send(user);
        expect(response.status).toBe(200);
        yield Truncate();
    }));
    it('PUT /user should edit a user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testUser.create(user);
        const editedUser = {
            id: 1,
            user_name: 'Edited User Name',
            first_name: 'Edited First Name',
            last_name: 'Edited Last Name',
            password: 'editeduserpassword'
        };
        const response = yield request
            .put('/user')
            .set('Authorization', `Bearer ${token}`)
            .send(editedUser);
        expect(response.status).toBe(200);
        yield Truncate();
    }));
    it('DELETE /user should create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testUser.create(user);
        const newUser = {
            id: 1
        };
        const response = yield request
            .delete('/user')
            .set('Authorization', `Bearer ${token}`)
            .send(newUser);
        expect(response.status).toBe(200);
        yield Truncate();
    }));
});
