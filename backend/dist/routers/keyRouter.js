"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.keyRouter = express_1.default.Router();
// SadaPay client ID endpoint
exports.keyRouter.get('/sadapay', (req, res) => {
    res.json({ clientId: process.env.SADAPAY_CLIENT_ID || 'sadapay-demo-client-id' });
});
