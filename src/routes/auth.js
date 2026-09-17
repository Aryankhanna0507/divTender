// this route folder will manage all the routs 
// this auth.js file will manage the auth related routes 

const express=require("express");
const {validateSignupData}=require("../utils/validation.js")
const User=require("../models/user.js");
const bcrypt=require("bcrypt");
const validator=require("validator");


const authRouter=express.Router();

// creating the sign up api 

authRouter.post("/signup",async (req,res)=>{
  try {   
    validateSignupData(req);

  const {firstName,lastName,emailId,password}=req.body;
  const passwordHash=await bcrypt.hash(password,10);
  console.log(passwordHash);
  
  const user=new User({
    firstName,
    lastName,
    emailId,
    password:passwordHash
  });
  console.log(user);
  await user.save();
  res.send("signed in successfully!");
  
} catch (error) {
  res.status(400).send(error.message);

}
})

// creating a login api  

authRouter.post("/login",async (req,res)=>{
  try{
    const {emailId,password}=req.body;
    const isValidEmail=validator.isEmail(emailId);
    if(!isValidEmail){
      throw new Error("Invalid credentials");
    }
    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid credentials")
    }

    const isValidPassword=user.validatePassword(password);

    if(!isValidPassword){
      throw new error("Invalid credentials")
    }
    const token=await user.getJWT();

    console.log(token);
    res.cookie('token',token,{expires:new Date(Date.now()+7*3600000),httpOnly:true});
    res.send("Login successfully!");
  }catch(err){
    res.status(400).send("login Failed:"+err.message);
  }
})

module.exports={
  authRouter
}