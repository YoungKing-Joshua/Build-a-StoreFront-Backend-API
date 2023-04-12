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
const users_1 = require("../../models/users");
const database_1 = __importDefault(require("../../database"));
const testUser = new users_1.UsersModel();
describe('User Model', () => {
    describe('Test methods exists', () => {
        it('index method should be defined', () => {
            expect(testUser.index).toBeDefined();
        });
        it('show method should be defined', () => {
            expect(testUser.show).toBeDefined();
        });
        it('create method should be defined', () => {
            expect(testUser.create).toBeDefined();
        });
        it('edit method should be defined', () => {
            expect(testUser.edit).toBeDefined();
        });
        it('delete method should be defined', () => {
            expect(testUser.delete).toBeDefined();
        });
    });
    describe('Test user model logic', () => {
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
        it('should create a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdUser = yield testUser.create(user);
            if (createdUser) {
                expect(createdUser.user_name).toBe(user.user_name);
                expect(createdUser.last_name).toBe(user.last_name);
                //expect(createdUser.user_password).toBe(hashPass(User.user_password));
            }
            yield Truncate();
        }));
        it('index method should show all users in db', () => __awaiter(void 0, void 0, void 0, function* () {
            yield testUser.create(user);
            const allUsers = yield testUser.index();
            expect(allUsers.length).toBeGreaterThan(0);
            yield Truncate();
        }));
        it('show method should show a user with id specified', () => __awaiter(void 0, void 0, void 0, function* () {
            yield testUser.create(user);
            const allUsers = yield testUser.index();
            const addedUserId = allUsers[0].id;
            const result = yield testUser.show(addedUserId);
            expect(user.user_name).toBe(result.user_name);
            expect(user.last_name).toBe(result.last_name);
            yield Truncate();
        }));
        it('edit method should edit a user', () => __awaiter(void 0, void 0, void 0, function* () {
            yield testUser.create(user);
            const editedUser = {
                user_name: 'Edited User Name',
                first_name: 'Edited First Name',
                last_name: 'Edited Last Name',
                password: 'editeduserpassword'
            };
            yield testUser.edit(editedUser);
            const allUsers = yield testUser.index();
            const addedUserId = allUsers[0].id;
            const newResult = yield testUser.show(addedUserId);
            expect(user.user_name).toBe(newResult.user_name);
            expect(user.last_name).toBe(newResult.last_name);
            yield Truncate();
        }));
        it('delete method should delete user with id specified', () => __awaiter(void 0, void 0, void 0, function* () {
            yield testUser.create(user);
            const allUsers = yield testUser.index();
            const addedUserId = allUsers[0].id;
            yield testUser.delete(addedUserId);
            expect(user.user_name).toBeNull;
            expect(user.last_name).toBeNull;
            yield Truncate();
        }));
    });
});
