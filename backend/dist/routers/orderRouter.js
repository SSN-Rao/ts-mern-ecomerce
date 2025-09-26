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
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const utils_1 = require("../utils");
const orderModel_1 = require("../models/orderModel");
exports.orderRouter = express_1.default.Router();
exports.orderRouter.get('/mine', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orderModel_1.OrderModel.find({ user: req.user._id });
    res.json(orders);
})));
exports.orderRouter.get('/:id', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.OrderModel.findById(req.params.id);
    if (order) {
        res.json(order);
    }
    else {
        res.status(404).json({ message: 'Order Not Found' });
    }
})));
exports.orderRouter.post('/', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.orderItems.length === 0) {
        res.status(400).json({ message: 'Cart is empty' });
    }
    else {
        const CreateOrder = yield orderModel_1.OrderModel.create({
            orderItems: req.body.orderItems.map((x) => (Object.assign(Object.assign({}, x), { product: x._id }))),
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });
        const createdOrder = yield CreateOrder.save();
        res.status(201).json({
            message: 'New Order Created',
            order: createdOrder
        });
    }
})));
exports.orderRouter.put('/:id/pay', utils_1.isAuth, asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.OrderModel.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = new Date(Date.now());
        order.paymentResult = {
            paymentId: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };
        const updateOrder = yield order.save();
        res.send({ order: updateOrder, message: "order Paid Successfully" });
    }
    else {
        res.status(404).json({ message: 'Order Not Found' });
    }
})));
function asyncHandler(fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
exports.orderRouter.put('/:id/deliver', utils_1.isAuth, asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.OrderModel.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = new Date(Date.now());
        const updateOrder = yield order.save();
        res.send({ order: updateOrder, message: "order Delivered Successfully" });
    }
    else {
        res.status(404).json({ message: 'Order Not Found' });
    }
})));
