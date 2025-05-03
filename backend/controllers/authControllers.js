import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/usermodels.js";
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      if (existingUser.isVerified) {
        return res.json({ success: false, message: "User already exists" });
      } else {
        return res.json({
          success: true,
          message: "Verify Otp",
          userId: existingUser._id,
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      verifyOtp: otp,
      verifyOTPExpiryAt: Date.now() + 10 * 60 * 1000,
    });

    await user.save();

    const mailSend = {
      from: process.env.SMTP_SENDERID,
      to: email,
      subject: "Verify your CoinHive account",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #ddd;">
          <h2 style="color: #4CAF50; text-align: center;">Verify Your Email</h2>
          <p style="font-size: 16px; color: #333;">Hello ${name},</p>
          <p style="font-size: 16px; color: #333;">Thank you for registering on CoinHive! To complete your registration, please use the OTP (One-Time Password) below to verify your email address:</p>
          <div style="font-size: 24px; font-weight: bold; background-color: #f1f1f1; padding: 15px; text-align: center; border-radius: 4px; color: #333; letter-spacing: 3px;">
              ${otp}
          </div>
          <p style="font-size: 16px; color: #333;">This OTP will expire in 10 minutes. Please use it before it expires. If you did not request this, you can safely ignore this email.</p>
          <p style="font-size: 14px; color: #777;">If you face any issues, feel free to <a href="mailto:abdulhaseeb2350@gmail.com" style="color: #4CAF50;">contact us</a>.</p>
          <p style="font-size: 14px; color: #777; text-align: center;">Thanks for choosing CoinHive!</p>
      </div>
      `,
    };

    transporter.sendMail(mailSend, (error, info) => {
      if (error) {
        console.log("Error sending OTP email:", error.message);
      }
    });

    return res.json({
      success: true,
      message: "User registered. Verification OTP sent to your email.",
      userId: user._id,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//by email
export const getUserData = async (req, res) => {
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

export const sendVerificationOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Missing Details" });
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const expiry = Date.now() + 10 * 60 * 1000;

  const existingUser = await userModel.findOne({ email });
  let name = "";

  if (existingUser) {
    name = existingUser.name;

    if (Number(existingUser.verifyOTPExpiryAt) > Date.now()) {
      return res.json({
        success: false,
        message: "OTP sent has not expired yet!",
      });
    }

    const response = await userModel.updateOne(
      { email },
      {
        $set: {
          verifyOtp: otp,
          verifyOTPExpiryAt: expiry,
        },
      }
    );

    console.log(response);

    const mailSend = {
      from: process.env.SMTP_SENDERID,
      to: email,
      subject: "Verify your CoinHive account",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #ddd;">
          <h2 style="color: #4CAF50; text-align: center;">Verify Your Email</h2>
          <p style="font-size: 16px; color: #333;">Hello ${name},</p>
          <p style="font-size: 16px; color: #333;">Thank you for registering on CoinHive! To complete your registration, please use the OTP (One-Time Password) below to verify your email address:</p>
          <div style="font-size: 24px; font-weight: bold; background-color: #f1f1f1; padding: 15px; text-align: center; border-radius: 4px; color: #333; letter-spacing: 3px;">
              ${otp}
          </div>
          <p style="font-size: 16px; color: #333;">This OTP will expire in 10 minutes. Please use it before it expires. If you did not request this, you can safely ignore this email.</p>
          <p style="font-size: 14px; color: #777;">If you face any issues, feel free to <a href="mailto:abdulhaseeb2350@gmail.com" style="color: #4CAF50;">contact us</a>.</p>
          <p style="font-size: 14px; color: #777; text-align: center;">Thanks for choosing CoinHive!</p>
      </div>
      `,
    };

    try {
      await transporter.sendMail(mailSend);
      console.log("Otp sent successfully: ", email);
      return res
        .status(200)
        .json({ success: true, message: "Otp sent successfully" });
    } catch (error) {
      console.error("Error sending OTP email:", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to send otp" });
    }
  } else {
    return res.status(404).json({ success: false, message: "User not found" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email or Password is Missing",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid Email" });
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.json({ success: false, message: "Invalid Password" });
    }
    if (!user.isVerified) {
      return res.json({
        success: false,
        message: "Please verify your email to login",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!user.verifyOtp || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOTPExpiryAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOTPExpiryAt = 0;

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const mailSend = {
      from: process.env.SMTP_SENDERID,
      to: user.email,
      subject: "Account Successfully Verified",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #ddd;">
            <h2 style="color: #4CAF50; text-align: center;">Account Verified Successfully!</h2>
            <p style="font-size: 16px; color: #333;">Hi ${user.name},</p>
            <p style="font-size: 16px; color: #333;">Congratulations! Your CoinHive account has been successfully verified. You can now enjoy all the features of our platform.</p>
            <p style="font-size: 16px; color: #333;">You can log in using your registered email address and password</p>
            <p style="font-size: 14px; color: #777; text-align: center;">If you did not sign up for CoinHive, please <a href="mailto:abdulhaseeb2350@gmail.com" style="color: #4CAF50;">contact us</a> immediately.</p>
            <p style="font-size: 14px; color: #777; text-align: center;">Thanks for choosing CoinHive!</p>
        </div>
        `,
    };
    transporter.sendMail(mailSend, (error, info) => {
      if (error) {
        console.log("Error sending OTP email:", error.message);
      }
    });
    return res.json({ success: true, message: "Email verified" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const sendPasswordResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOTP = otp;
    user.resetOTPExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const mailSend = {
      from: process.env.SMTP_SENDERID,
      to: user.email,
      subject: "Password Reset OTP",
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #ff6f00; text-align: center;">Reset Your Password</h2>
                    <p>Hi ${user.name || "there"},</p>
                    <p>Your One-Time Password (OTP) to reset your password is:</p>
                    <div style="font-size: 24px; font-weight: bold; background-color: #f1f1f1; padding: 10px; text-align: center; border-radius: 4px; letter-spacing: 2px;">
                        ${otp}
                    </div>
                    <p>This OTP is valid for the next 10 minutes.</p>
                    <p>If you didn't request a password reset, please ignore this email.</p>
                    <p style="margin-top: 20px;">Thanks,<br/><strong>The CoinHive Team</strong></p>
                </div>
            `,
    };

    transporter.sendMail(mailSend, (error, info) => {
      if (error) {
        console.log("Error sending password reset OTP email:", error.message);
      }
    });

    return res.json({
      success: true,
      message: "Password reset OTP sent to your email",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "Email,OTP and New Password is Required",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User with this given email does not exist ",
      });
    }
    if (user.resetOTP === "" || user.resetOTP !== otp) {
      return res.json({ success: false, message: "Invalid OTP " });
    }
    if (user.resetOTPExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOTP = "";
    user.resetOTPExpireAt = 0;
    await user.save();
    return res.json({
      success: true,
      message: "Password has been Reset Successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
