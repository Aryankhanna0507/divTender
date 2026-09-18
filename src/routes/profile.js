const express=require("express");
const {userAuth}=require("../middlewares/auth.js");
const {validateEditProfileData}=require("../utils/validation.js");
const User=require("../models/user.js");
const profileRouter=express.Router()
const validator=require("validator");
const bcrypt=require("bcrypt")
// creating the profile api
profileRouter.get("/profile/view",userAuth,async (req,res)=>{
  try{
  const user=req.user;
  res.send({
    message:"got the user profile",
    user
  });
  } catch(err){
    res.status(401).send("something went wrong:"+err.message);
  } 
});
profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{

  // const user=req.user;
  // const toBeUpdated=req.body;


// console.log(req.body)
  
  // console.log(user);
  // res.send("edit successfully");
  //  const userId=user._id;
  //  console.log(user);
  //  const userId=user._id;
  //  console.log(toBeUpdated);
  //  const updatedUser=await User.findByIdAndUpdate(userId,toBeUpdated,{new:true});



  // By akshay sir's method (this is in good practice)

  try{
    validateEditProfileData(req); // if it throw error then execution flow of the code goes to the catch block
    const loggedinUser=req.user;
    console.log("before updating the data",loggedinUser);
    Object.keys(req.body).forEach((key)=>{
      loggedinUser[key]=req.body[key];
    });
    console.log("after updating tha data:",loggedinUser);
    await loggedinUser.save();
     res.json({
      message:"your profile has been updated successfully!",
      loggedinUser
     });
  }catch(err){
    res.status(400).send("invalid update:"+err.message);
  }

  // we can also do this using the following approach

  // try{
  //   validateEditProfileData(req);
  //   const loggedinUser=req.user;
  //   console.log("before updating the data"+loggedinUser);
  //   const updatedData=await User.findByIdAndUpdate(loggedinUser._id,req.body,{
  //     new:true,
  //     runValidator:true
  //   });
  //   console.log("after updating the user",updatedData);
  //   res.send(updatedData);
  // }catch(err){
  //   res.status(400).send("invalid update"+err.message);
  // }
})

profileRouter.patch("/profile/password",userAuth,async (req,res)=>{
  try{
    const loggedinUser=req.user;
    const {password:newPassword}=req.body;
    // console.log(loggedinUser);
    // console.log(req.body);
    if(!newPassword || newPassword.length<8 || !validator.isStrongPassword(newPassword)){
      throw new Error("password is not strong!!");
    }
    const hasedNewPassword=await bcrypt.hash(newPassword,10);
    // console.log(loggedinUser);
    loggedinUser["password"]=hasedNewPassword;
    await loggedinUser.save();
    res.json({
      message:"password has been updated successfully",
      loggedinUser
    })
  }catch(err){
    res.status(400).send("can not update password:"+err.message);
  }
  
  
})

module.exports={
  profileRouter,
}