"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleUsers = exports.sampleProducts = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.sampleProducts = [
    {
        _id: '1',
        name: 'Nice Slim Pant',
        slug: 'nice-slim-pant',
        category: 'Pants',
        image: '/images/nice-pant.jpg',
        price: 70,
        countInStock: 25,
        brand: 'Nike',
        rating: 4.5,
        numReviews: 14,
        description: 'High Quality product',
    },
    {
        _id: '2',
        name: 'Nice Shirt',
        slug: 'nice-shirt',
        category: 'Shirts',
        image: '/images/nice-shirt.jpg',
        price: 50,
        countInStock: 20,
        brand: 'Nike',
        rating: 4.2,
        numReviews: 10,
        description: 'A popular shirt',
    },
    {
        _id: '3',
        name: 'Adidas Shirt',
        slug: 'adidas-shirt',
        category: 'Shirts',
        image: '/images/adidas-shirt.jpg',
        price: 60,
        countInStock: 15,
        brand: 'Adidas',
        rating: 4.8,
        numReviews: 8,
        description: 'High Quality product',
    },
    {
        _id: '4',
        name: 'LG Watch',
        slug: 'lg-watch',
        category: 'Watches',
        image: '/images/lg-watch.jpg',
        price: 120,
        countInStock: 10,
        brand: 'LG',
        rating: 4.9,
        numReviews: 5,
        description: 'Most Demanded Watch',
    },
];
exports.sampleUsers = [
    {
        name: 'Joe',
        email: 'admin@example.com',
        password: bcryptjs_1.default.hashSync('123456'),
        isAdmin: true,
    },
    {
        name: 'Jhon',
        email: 'user@example.com',
        password: bcryptjs_1.default.hashSync('123456'),
        isAdmin: false,
    }
];
