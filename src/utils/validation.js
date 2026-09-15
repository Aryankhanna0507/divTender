// put all the validation code here 
const { model } = require("mongoose");
const validator=require("validator");
const validataSignupData=(req)=>{
  const {firstName,lastName,emailId,password}=req.body;
  if(!firstName || !lastName){
    throw new Error("Name is not valid!!");
  }else if(!emailId || !validator.isEmail(emailId)){
    throw new Error("Email is not valid")
  }else if(!password || !validator.isStrongPassword(password) || password.length<8){
    throw new Error("Please enter a strong password of lenght atleast 8")
  }
}
module.exports={
  validataSignupData,
}