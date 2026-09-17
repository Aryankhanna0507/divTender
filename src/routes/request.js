const express=require("express");
const {userAuth}=require("../middlewares/auth.js");
const requestRouter=express.Router();

requestRouter.post("/sendConnectionRequest",userAuth,async (req,res)=>{
  try{
    const user=req.user;
    res.send(user.firstName+"  sending the connection request");
  }catch(err){
    res.status(400).send("user not log in")
  }
})

module.exports={
  requestRouter
}