const {userAuth,adminAuth}=require("./middlewares/auth.js");
const express=require("express");

const app=express(); 

// error handling

app.use("/",(err,req,res,next)=>{ // it will not do anything because we do not have error here it will only work when you throw error 
  if(err){
    // Log your erros
    res.status(500).send("something went wrong")
  }
})

// app.get("/getUserData",(req,res)=>{
  // //logic of db call and get the user data
  // // what if code have some errors
  // throw new Error("dkfoedfj"); // this is not the good way to handle errors
  
  // res.send("data has been sent ot the user")
  // })
  // always try to write all the code in try catch block
  // using try catch here
app.get("/getUserData",(req,res)=>{
  try{

    //logic of db call and get the user data
    // what if code have some errors
    throw new Error("dkfoedfj"); // this is not the good way to handle errors
    res.send("data has been sent ot the user")
  }catch(err){
    res.status(500).send("some error contact suppot team")
  }
  // now the error will be handled inside the catch block it will not go ahead
})
app.use("/",(err,req,res,next)=>{ // "/" -> means it matches all the routes basically its like a wild card (here it is working as the error handling middleware)
  if(err){
    // Log your erros
    res.status(500).send("something went wrong")
  }
})
// always keep this error handling middleware at the end
app.listen(3000,()=>{
  console.log("your server is listing successfully on port 3000....");
});