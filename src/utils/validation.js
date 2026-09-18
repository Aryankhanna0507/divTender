// put all the validation code here 
const { model } = require("mongoose");
const validator=require("validator");
const validateSignupData=(req)=>{
  const {firstName,lastName,emailId,password}=req.body;
  if(!firstName || !lastName){
    throw new Error("Name is not valid!!");
  }else if(!emailId || !validator.isEmail(emailId)){
    throw new Error("Email is not valid")
  }else if(!password || !validator.isStrongPassword(password) || password.length<8){
    console.log(password);
    throw new Error("Please enter a strong password of lenght atleast 8")
  }
}

// create a funtion to validate edit profile data 
const validateEditProfileData=(req)=>{
  // i dont want user to update all the fields 
  const updateAllowed=["firstName","lastName","age","photo","gender","skills"];
  const isUpadateAllowed=Object.keys(req.body).every((field)=>{
    return updateAllowed.includes(field);
  });
  if(!isUpadateAllowed){
    throw new Error("update fields are not allowed");
  }
  const {skills,about}=req.body;
  if(skills.lenght>10){
    throw new Error("can not have more than 10 skills");
  }

} 
module.exports={
  validateSignupData,
  validateEditProfileData
}