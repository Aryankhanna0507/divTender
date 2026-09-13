const {userAuth,adminAuth}=require("./middlewares/auth.js");
const express=require("express");
const {connectDB}=require("./config/database.js");

const app=express(); 

const User=require("./models/user.js");
app.use(express.json()); 
// create post/signup api 
app.post("/signup",async (req,res)=>{
try {
  const user=new User(req.body);
  
  await user.save();
  res.send("signed in successfully!");
  
} catch (error) {
  res.status(400).send("can not sgined in")
}


})

// create the get user api 
// get the user using the email id 
app.get("/user",async (req,res)=>{
  // const users=await User.find(); this will give all the users 
  // console.log(users);
  try{
      const {emailId}=req.body;
      console.log(emailId);
      const user=await User.findOne({emailId:emailId});// here we pass the filter , and this filter takes the java script object 
    
      console.log(user);
      if(user==null){
        res.status(404).send("user not found!");
      }
      
      res.send("get the users:"+"\n"+user);
    }catch(err){
      res.status(400).send("can not get the user")
    }
})

// find all the users from the api 
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
  res.status(400).send("something went wrong");
}
})

connectDB().then(()=>{
  console.log("your database has been connected successfully....");
  app.listen(3000,()=>{
    console.log("your serer is listing successfully on port:30000....");
  })
}).catch((err)=>{
  console.log("failed to connect the database!!!!");
})
