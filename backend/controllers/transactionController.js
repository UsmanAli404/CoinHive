import axios from 'axios';
import Portfolio from '../models/portfolioModel.js';


export const makeTransaction = async (req, res) => {
    try {
        const { userEmail } = req.body;
        const { type, asset, quantity } = req.body;

        if (!['buy', 'sell'].includes(type)) {
            return res.status(400).json({ message: 'Invalid transaction type' });
        }

        if (!asset || typeof asset !== 'string') {
            return res.status(400).json({ message: 'Invalid asset' });
        }

        if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

        const priceResponse = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${asset.toUpperCase()}USDT`);
        const latestPrice = parseFloat(priceResponse.data.price);

        if (!latestPrice || isNaN(latestPrice)) {
            return res.status(500).json({ message: 'Failed to fetch latest price' });
        }

        let portfolio = await Portfolio.findOne({ userEmail });
        if (!portfolio) {
            portfolio = new Portfolio({ userEmail, transactions: [], inventory: [], watchList: [] });
        }

        const newTransaction = {
            type,
            asset,
            quantity,
            price: latestPrice,
            date: new Date()
        };
        portfolio.transactions.push(newTransaction);

        const inventoryItem = portfolio.inventory.find(item => item.asset === asset);

        if (type === 'buy') {
            if (inventoryItem) {
                const totalQty = inventoryItem.quantity + quantity;
                inventoryItem.averagePrice = ((inventoryItem.quantity * inventoryItem.averagePrice) + (quantity * latestPrice)) / totalQty;
                inventoryItem.quantity = totalQty;
            } else {
                portfolio.inventory.push({
                    asset,
                    quantity,
                    averagePrice: latestPrice
                });
            }
        } else if (type === 'sell') {
            if (!inventoryItem || inventoryItem.quantity < quantity) {
                return res.status(400).json({ message: 'Not enough asset to sell' });
            }

            inventoryItem.quantity -= quantity;

            if (inventoryItem.quantity === 0) {
                portfolio.inventory = portfolio.inventory.filter(item => item.asset !== asset);
            }
        }

        await portfolio.save();
        return res.status(200).json({ message: 'Transaction successful', transaction: newTransaction });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
