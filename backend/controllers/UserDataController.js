import userModel from "../models/usermodels.js";
import Portfolio from '../models/portfolioModel.js';

//by email
export const getUserDataByEmail = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Missing Details" });
  }

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.json({ success: true, userData: existingUser });
  }

  return res.status(404).json({ success: false, message: "User not found" });
};

//by id
export const getUserDataById = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: "Missing User ID" });
  }

  try {
    const existingUser = await userModel.findById(userId).select('-password');
    
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, userData: existingUser });

  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getUserEmailFromId = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: "Missing User ID" });
  }

  try {
    const user = await userModel.findById(userId).select('email name');

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      email: user.email,
      name: user.name
    });

  } catch (error) {
    console.error("Error fetching user email:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getUserPortfolio = async (req, res) => {
    try {
        const { userEmail } = req.body;

        if (!userEmail || typeof userEmail !== 'string') {
            return res.status(400).json({ message: 'User email is required' });
        }

        const user = await userModel.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let portfolio = await Portfolio.findOne({ userEmail });

        if (!portfolio) {
            portfolio = new Portfolio({
                userEmail,
                transactions: [],
                inventory: [],
                watchList: []
            });
            await portfolio.save();
        }

        return res.status(200).json({
            success: true,
            balance: user.balance.toFixed(2),
            portfolio: {
                inventory: portfolio.inventory,
                transactions: portfolio.transactions,
                watchList: portfolio.watchList
            }
        });

    } catch (error) {
        console.error('Portfolio Fetch Error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};