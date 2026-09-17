// creating the authe middleware
// we require the auth middleware beacuse i want my all api are secure only signup and login api does not require any authentication 
const jwt=require("jsonwebtoken");
const User=require("../models/user.js")
const userAuth=async (req,res,next)=>{
  // job of this middlerware is 
  // read the token from the req cookies
  // validate the token
  // find the user name
  // lets do everything step by step 
  try{
      const cookies=req.cookies
      console.log(cookies);
    const {token}=cookies;
    if(!token){
      throw new Error("token is not valid");
    }
    const decodedMessage=await jwt.verify(token,"DEV@tinder$123$");
    const {_id}=decodedMessage;
    const user=await User.findById({_id});

    if(!user){
      throw new Error("user is not present");
    }
    req.user=user;// just attach the user with the req because there is no point to do the findById again in the request handler
    next(); // to move the next middleware or request handler
  }catch(err){
    res.status(400).send("something went wrong int auth function:"+err.message);
  }

}
module.exports={
  userAuth
}