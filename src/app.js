const {userAuth,adminAuth}=require("./middlewares/auth.js");
const express=require("express");
const {connectDB}=require("./config/database.js");
const app=express(); 
// first of get the user model
const User=require("./models/user.js");


//  if i create a route handler without giving the route then it will work for all the route  
app.use(express.json());// this is middleware is aplicable for all the routes 
// it will  run for all 

// for stroing the data the request will be as a post reqeust
app.post("/signup",async (req,res)=>{
// instead of writing hard coded data, we want the data dynamically, user send us the data 
// my api should receive the data and push data into the database
// suppose client is sending the data in json format
// we can not directly read the json data 
// we need a middleware that read the json data
// there is middleware given by express express.json()
// console.log(req.body)-> without express.json() it will give undefind
// console.log(req.body)
// storing the data into the database
const user=new User(req.body);
await user.save();
res.send("signed in successfully!");
 
})

connectDB().then(()=>{
  console.log("your database has been connected successfully....");
  app.listen(3000,()=>{
    console.log("your serer is listing successfully on port:30000....");
  })
}).catch((err)=>{
  console.log("failed to connect the database!!!!");
})
