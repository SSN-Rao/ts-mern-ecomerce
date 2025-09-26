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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = require("../models/userModel");
const utils_1 = require("../utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.userRouter = express_1.default.Router();
//POST /api/users/signin
exports.userRouter.post('/signin', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.UserModel.findOne({ email: req.body.email });
    if (user) {
        if (bcryptjs_1.default.compareSync(req.body.password, user.password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: (0, utils_1.generateToken)(user),
            });
            return;
        }
    }
    res.status(401).send({ message: 'Invalid email or password' });
})));
exports.userRouter.post('/signup', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs_1.default.hashSync(req.body.password),
    });
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: (0, utils_1.generateToken)(user),
    });
})));
