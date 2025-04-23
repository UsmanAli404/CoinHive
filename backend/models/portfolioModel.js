const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        ref: 'User',
    },
    transactions: [
        {
            type: {
                type: String,
                enum: ['buy', 'sell'],
                required: true,
            },
            asset: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    inventory: [
        {
            asset: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            averagePrice: {
                type: Number,
                required: true,
            },
        },
    ],
    watchList: [
        {
            asset: {
                type: String,
                required: true,
            },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);