const express=require("express");

const app=express(); // here we are creating express js application
// we are creating web server 
// now we have to listen on some port so that anybody connect with it 

app.use("/test",(req,res)=>{ // this function is called request handler
  res.send("hello from the server!")
})
app.use("/hello",(req,res)=>{
  res.send("hello  hello hello");
})
app.use("/",(req,res)=>{
  res.send("this is by default if you do not add / ");
})

app.listen(3000,()=>{
  console.log("your server is listing successfully on port 3000....");
});