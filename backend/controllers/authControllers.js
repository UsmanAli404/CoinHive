import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/usermodels.js';
import transporter from '../config/nodemailer.js';
export const register = async(req,res) =>{
    const{name,email,password} = req.body;

    if(!name || !email || !password)
    {
        return res.json({success:false,message:'Missing Details'})
    }
    try{
           const existingUser = await userModel.findOne({email})
            if(existingUser)
            {
                return res.json({success:false,message:'User already exists'})
            }
           const hashedPassword = await bcrypt.hash(password,10)
           const user = new userModel({name,email,password:hashedPassword})
           await user.save();
           const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
           res.cookie('token',token ,{
            httpOnly: true,
            secure:process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ?
            'none':'strict',
            maxAge: 7*24*60*60*1000
           })

          const mailSend = {
            from:process.env.SMTP_SENDERID,
            to:email,
            subject:'Welcome to CoinHive',
            html: `<h2>Welcome to <span style="color:#4CAF50;">CoinHive</span>!</h2>
                   <p>Your account has been created successfully with the email: <strong>${email}</strong></p>
                  <p>We're glad to have you on board 🚀</p>`
          }
          //await transporter.sendMail(mailSend);
          transporter.sendMail(mailSend, (error, info) => {
            if (error) {
              return console.log('Error:', error.message);
            }
          });
           return res.json({success:true});
    }catch(error)
    {
       return res.json({success:false,message:error.message})
    }
}

export const login = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)
    {
        return res.json({success:false,message:'Email or Password is Missing'})
    }
    try{
           const user = await userModel.findOne({email})
           if(!user)
           {
                return res.json({success:false,message:'Invalid Email'})
           }
           const passwordMatched = await bcrypt.compare(password,user.password);
           if(!passwordMatched)
           {
            return res.json({success:false,message:'Invalid Password'})
           }
           const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
           res.cookie('token',token ,{
            httpOnly: true,
            secure:process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ?
            'none':'strict',
            maxAge: 7*24*60*60*1000
           });
           return res.json({success:true});
    }catch(error){
        return res.json({success:false,message:error.message})
    }
}
export const logout = async(req,res)=>{
    try{
      
         res.clearCookie('token',{
            httpOnly: true,
            secure:process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ?
            'none':'strict'
         })
         return res.json({success:true,message:"Logged Out"});
    }catch(error){
        return res.json({success:false,message:error.message});
    }
}
export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account already verified" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOTPExpiryAt = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        const mailSend = {
            from: process.env.SMTP_SENDERID,
            to: user.email,
            subject: 'Account Verification OTP',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #4CAF50; text-align: center;">Verify Your Account</h2>
                    <p>Hi there,</p>
                    <p>Your One-Time Password (OTP) is:</p>
                    <div style="font-size: 24px; font-weight: bold; background-color: #f1f1f1; padding: 10px; text-align: center; border-radius: 4px; letter-spacing: 2px;">
                        ${otp}
                    </div>
                    <p>Please use this OTP to verify your account. This code is valid for the next 10 minutes.</p>
                    <p>If you did not request this, you can safely ignore this email.</p>
                    <p style="margin-top: 20px;">Thanks,<br/><strong>The CoinHive Team</strong></p>
                </div>
            `
        };

        transporter.sendMail(mailSend, (error, info) => {
            if (error) {
                console.log('Error sending OTP email:', error.message);
            }
        });

        return res.json({ success: true, message: 'Verification OTP sent on Email' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { userId, otp } = req.body;

      
        if (!userId || !otp) {
            return res.json({ success: false, message: 'Missing Details' });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        
        if (!user.verifyOtp || user.verifyOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        
        if (user.verifyOTPExpiryAt < Date.now()) {
            return res.json({ success: false, message: 'OTP expired' });
        }

        
        user.isVerified = true;
        user.verifyOtp = '';
        user.verifyOTPExpiryAt = 0;

        await user.save();

        return res.json({ success: true, message: 'Email verified successfully' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
export const isAuthenticated = async(req,res)=>{
    try{
          return res.json({success:true});
    }catch(error){
        return res.json({success:false,message:error.message})
    }
}

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
            subject: 'Password Reset OTP',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #ff6f00; text-align: center;">Reset Your Password</h2>
                    <p>Hi ${user.name || 'there'},</p>
                    <p>Your One-Time Password (OTP) to reset your password is:</p>
                    <div style="font-size: 24px; font-weight: bold; background-color: #f1f1f1; padding: 10px; text-align: center; border-radius: 4px; letter-spacing: 2px;">
                        ${otp}
                    </div>
                    <p>This OTP is valid for the next 10 minutes.</p>
                    <p>If you didn't request a password reset, please ignore this email.</p>
                    <p style="margin-top: 20px;">Thanks,<br/><strong>The CoinHive Team</strong></p>
                </div>
            `
        };

        transporter.sendMail(mailSend, (error, info) => {
            if (error) {
                console.log('Error sending password reset OTP email:', error.message);
            }
        });

        return res.json({ success: true, message: 'Password reset OTP sent to your email' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
 export const resetPassword = async(req,res)=>{
    const {email,otp,newPassword} = req.body;
    if(!email || !otp || !newPassword)
    {
        return res.json({success:false,message:"Email,OTP and New Password is Required"})
    }
    try{
        const user= await userModel.findOne({email})
        if(!user)
        {
            return res.json({success:false,message:"User with this given email does not exist "})
        }
        if(user.resetOTP === ""|| user.resetOTP !== otp)
        {
            return res.json({success:false,message:"Invalid OTP "})
        }
        if(user.resetOTPExpireAt < Date.now())
        {
            return res.json({success:false,message:"OTP Expired"})
        }

        const hashedPassword = await bcrypt.hash(newPassword,10)
        user.password = hashedPassword;
        user.resetOTP = '';
        user.resetOTPExpireAt = 0;
        await user.save();
        return res.json({success:true,message:"Password has been Reset Successfully"})

    }catch(error)
    {
        return res.json({success:false,message:error.message})
    }
 }