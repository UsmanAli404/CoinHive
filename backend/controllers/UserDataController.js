import userModel from "../models/usermodels.js";
export const getUserData = async(req,res)=>{
    try{
    const{userId} = req.body;
    const user = await userModel.findById(userId)
    if(!user)
     {
        return res.json({success:false,message:"user Not Found"})
     }
     
     return res.json({success:true,UserData:{
        name: user.name,
        isAccountVerified: user.isVerified 
     }})
    }catch(error)
    {
        return res.json({success:false,message:error.message})
    }
}