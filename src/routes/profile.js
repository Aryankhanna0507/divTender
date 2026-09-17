const express=require("express");
const {userAuth}=require("../middlewares/auth.js");
const profileRouter=express.Router()

// creating the profile api
profileRouter.get("/profile",userAuth,async (req,res)=>{
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

module.exports={
  profileRouter,
}