const {userAuth,adminAuth}=require("./middlewares/auth.js");
const express=require("express");
const {connectDB}=require("./config/database.js");
const {validataSignupData}=require("./utils/validation.js")
const bcrypt=require("bcrypt");
const validator=require("validator");
const app=express(); 

const User=require("./models/user.js");
app.use(express.json()); 

// create post/signup api 
app.post("/signup",async (req,res)=>{
  try {
  // sign up api should be very secure
  
 // validation of the data    
    validataSignupData(req);
  // encrypt the password  
  const {firstName,lastName,emailId,password}=req.body;
  const passwordHash=await bcrypt.hash(password,10);
  console.log(passwordHash);
  
  // dont write the logic for validation and other things here just write the logic for only api  create a differtent folder named utiles and put these exrtra logic in that folder

  // creating the new instance of the user model
  // never directly store everythign in req.body it may contain "xyz":"kuch bhi"
  // only store the tings that have meaning for you
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

// creating the login api

app.post("/login",async (req,res)=>{
  try{
    // first of take the data given by the uer

    const {emailId,password}=req.body;
    // apply senitization on the email id
    const isValidEmail=validator.isEmail(emailId);
    if(!isValidEmail){
      throw new Error("Invalid credentials");
    }
    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid credentials")
    }
    const isValidPassword=bcrypt.compare(password,user.password);
    if(!isValidPassword){
      throw new error("Invalid credentials")
    }
    res.send("Login successfully!");
  }catch(err){
    res.status(400).send("login Failed:"+err.message);
  }
})

// get the user using the email id 
app.get("/user",async (req,res)=>{
  try{
      const {emailId}=req.body;
      console.log(emailId);
      const user=await User.findOne({emailId:emailId});
    
      console.log(user);
      if(user==null){
        res.status(404).send("user not found!");
      }
      
      res.send("get the users:"+"\n"+user);
    }catch(err){
      res.status(400).send("can not get the user"+err)
    }
})

// feed api get/feed - get all the users from the database
app.get("/feed",async (req,res)=>{
  try{
    const users=await User.find();
    if(users.length!=0){
      res.send(users);
    }else{
      res.status(404).send("can not get the users");
    }
}catch(err){
  res.status(400).send("something went wrong"+err);
}
})
// create delete user api using findbyidanddelete app.delete

app.delete("/delete",async (req,res)=>{
  try {
    const userId=req.body.userId;

    const deletedUser=await User.findByIdAndDelete(userId);
    if(deletedUser==null){
      res.status(401).send("can not delete the user");
    }
    res.send("user deleted");
  } catch (error) {
    res.status(401).send("somthing went wrong"+error);
  }
})
//  creat an api for updating the data app.patch (findoneandupdate vs findbyidandupdate)


// dont send the user id as req.body 
app.patch("/update/:userId",async (req,res)=>{
// i want once the user register i can not change the email id firstName,lastName age....
// if it send "xyz":"change  it " but out data has no feild named xyz so we have senitize the data
// whenever you recieve anything from the req.bogy always do the validation and senitization 
// try to apply validation on each and every data send by the user 
// never trust the data send by the user because it can send lot errorfull data
// example if user send skill of size 1e10 or it repeats just one skill
// apply validation for this 
try{
    const userId=req.params?.userId;
    const newData=req.body;
    const UPDATE_ALLOWED=["age","gender","about","skills","photo"];
    const isUPDATE_ALLOWED=Object.keys(newData).every((value)=>{
      return UPDATE_ALLOWED.includes(value);
    })
    if(isUPDATE_ALLOWED===false){
      throw new Error("update is not allowed");
    }
    // apply validation on skill array (user can have atmost 5 skills and all the skills must bu unique)
    const skills=req.body.skills;
    // console.log(skills);

    // you should add skills validator in the schema because it can be send while signup
    // if(skills){
    //   // console.log("skill is not present");
    //   if(skills.length>5){
    //     throw new Error("you can not insert more than 5 skills");
    //   }else{
    //     // for unique values insert all the valeus in the set then check size equals
    //     const uniqueValues=new Set();
    //     let isUnique=true;
    //     for(const val of skills){
    //       if(uniqueValues.has(val)){
    //         isUnique=false;
    //         break;
    //       }
    //       uniqueValues.add(val);
    //     }
    //     if(!isUnique){
    //       throw new Error("can not have duplicate skills");
    //     }
    //   }
    // }

    //  for now just apply validator for atmost 5 values 
    if(newData?.skills?.length>5){
      throw new Error("skills can not more than 5");
    }
    const dataUpdated= await User.findByIdAndUpdate(userId,newData,{returnDocument:'after',runValidators:true});
    // runvalidator true->mongoose run the validator only for updated parts 
    if(dataUpdated==null){
      res.status(401).send("can not update the user");
    }
    console.log(dataUpdated);

    res.send("user data has been updated");
  }catch(err){
    res.status(401).send("something went wrong "+err);
  }
})


connectDB().then(()=>{
  console.log("your database has been connected successfully....");
  app.listen(3000,()=>{
    console.log("your serer is listing successfully on port:3000....");
  })
}).catch((err)=>{
  console.log("failed to connect the database!!!!"+err.message);
})
