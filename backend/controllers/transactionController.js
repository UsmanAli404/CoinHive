import axios from 'axios';
import Portfolio from '../models/portfolioModel.js';
import User from '../models/usermodels.js';

export const makeTransaction = async (req, res) => {
    try {
        const { userEmail, type, asset, quantity } = req.body;

        if (!userEmail || typeof userEmail !== 'string') {
            return res.status(400).json({ message: 'User email is required' });
        }

        if (!['buy', 'sell'].includes(type)) {
            return res.status(400).json({ message: 'Invalid transaction type' });
        }

        if (!asset || typeof asset !== 'string') {
            return res.status(400).json({ message: 'Invalid asset' });
        }

        if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

      
        const priceResponse = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${asset.toUpperCase()}`);
        const latestPrice = parseFloat(priceResponse.data.price);

        if (!latestPrice || isNaN(latestPrice)) {
            return res.status(500).json({ message: 'Failed to fetch latest price' });
        }

        const transactionAmount = quantity * latestPrice;

        
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

       
        let portfolio = await Portfolio.findOne({ userEmail });
        if (!portfolio) {
            portfolio = new Portfolio({ userEmail, transactions: [], inventory: [], watchList: [] });
        }

       
        if (type === 'buy') {
            if (user.balance < transactionAmount) {
                return res.status(400).json({ message: 'Insufficient balance' });
            }

            const existingItem = portfolio.inventory.find(item => item.asset === asset);
            if (existingItem) {
                const totalQty = existingItem.quantity + quantity;
                const totalCost = (existingItem.quantity * existingItem.averagePrice) + transactionAmount;
                existingItem.averagePrice = totalCost / totalQty;
                existingItem.quantity = totalQty;
            } else {
                portfolio.inventory.push({
                    asset,
                    quantity,
                    averagePrice: latestPrice
                });
            }

            user.balance = parseFloat((user.balance - transactionAmount).toFixed(2));
        }

        if (type === 'sell') {
            const existingItem = portfolio.inventory.find(item => item.asset === asset);
            if (!existingItem || existingItem.quantity < quantity) {
                return res.status(400).json({ message: 'Not enough asset to sell' });
            }

            existingItem.quantity -= quantity;
            if (existingItem.quantity === 0) {
                portfolio.inventory = portfolio.inventory.filter(item => item.asset !== asset);
            }

            user.balance = parseFloat((user.balance + transactionAmount).toFixed(2));
        }

        const newTransaction = {
            type,
            asset,
            quantity,
            price: latestPrice,
            date: new Date()
        };
        portfolio.transactions.push(newTransaction);

        await portfolio.save();
        await user.save();

        return res.status(200).json({
            message: 'Transaction successful',
            transaction: newTransaction,
            balance: user.balance.toFixed(2),
            inventory: portfolio.inventory
        });

    } catch (error) {
        console.error('Transaction Error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
