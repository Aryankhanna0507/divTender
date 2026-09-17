const express=require("express");
const {connectDB}=require("./config/database.js");
const cookieParser=require("cookie-parser");

const app=express(); 

const User=require("./models/user.js");
app.use(express.json()); 
app.use(cookieParser())

// now import all the routers
const {authRouter}=require("./routes/auth.js");
const {profileRouter}=require("./routes/profile.js");
const {requestRouter}=require("./routes/request.js");
// how to use these routes
app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)

connectDB().then(()=>{
  console.log("your database has been connected successfully....");
  app.listen(3000,()=>{
    console.log("your serer is listing successfully on port:3000....");
  })
}).catch((err)=>{
  console.log("failed to connect the database!!!!"+err.message);
})
