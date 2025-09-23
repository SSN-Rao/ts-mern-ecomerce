import express from 'express';

export const keyRouter = express.Router();

// SadaPay client ID endpoint
keyRouter.get('/sadapay', (req, res) => {
    res.json({ clientId: process.env.SADAPAY_CLIENT_ID || 'sadapay-demo-client-id' });
});