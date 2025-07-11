import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String , required:true,unique:true},
    balance: { type: Number, default: 100000 },
    password:{type:String , required:true},
    verifyOtp :{type:String,default:''},
    verifyOTPExpiryAt:{type:Number,default: 0},
    isVerified:{type:Boolean,default:false},
    resetOTP :{type:String,default:''},
    resetOTPExpireAt:{type:Number,default:0 },
    joinedAt: { type: Date, default: Date.now }
})

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel;