const {userAuth,adminAuth}=require("./middlewares/auth.js");
const express=require("express");

const app=express(); 

// REQUEST GET /user=> it will go through the chain of middlewares(function that are before the function having res.send() ) and at the end it send the reqeustion 
// the last function that having res.send()(means the function that sending response) is the main response or route handler and other are known as the middleware 
// we can have multiple route hander for the same route (we already know it)
// they are used of performing several operation before sending the respond like aunthentication , autheraization and many more 
// but we can create these function in different routes like this-
// app.use("/user",(req,res,next)=>{
//   console.log("route from the the first");
//   next();
// })
// app.use("/user",(req,res,next)=>{
//   console.log("route from the second one");
//   // next();
//   res.send("finally got the response from route 2")
// })

// example-:

// handle the auth mideleware for all GET,POST... requests

// app.use("/user",(req,res,next)=>{
//   const token="xyz";
//   const isAuthenticated=token=="xyz";
//   if(isAuthenticated){
//     console.log("user is authenticaed");
//     next();
//   }else{
//     res.status(401).send("the user is not authenticated");
//   }
// })
// commenting this because in best practices we create the middleware is seperate folder

// we can also wriete like this 
app.use("/admin",adminAuth);
app.get("/admin/getData",(req,res)=>{
  res.send("giving the data to admin");
})


// before giving the daata first check weather the uer is authenticated or not 
app.get("/user/getAllData",userAuth,(req,res)=>{
  res.send("got the complete data");
})
// before deleting the data first check weather the user is authenticated or not 
app.delete("/user/deleteData",userAuth,(req,res)=>{
  res.send("data has been deleted successfully");
})
app.post("/user/login",(req,res)=>{
  res.send("user logged in");
})





app.listen(3000,()=>{
  console.log("your server is listing successfully on port 3000....");
});