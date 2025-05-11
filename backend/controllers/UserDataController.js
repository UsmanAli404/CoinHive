import userModel from "../models/usermodels.js";

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