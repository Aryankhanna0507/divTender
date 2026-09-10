const express=require("express");

const app=express(); 
// you put a question mark it means now b is optional here
// if you + means any number b can be there a{bahut sare b}c
// if you put * means anything can be in there in place of star the only condition is start with ab{anything} end with cd
// +,?,* used in the older version now we have to follow this syntax
// ^\/ab+c$/
// using req.query (convert string into object)
// for hadling dynamic routes  /user/:userId using req.params (convert string into object)
app.get("/user/:userId/:name",(req,res)=>{
  // console.log(req.query);
  // console.log(`your name is ${req.query.name} and your age is ${req.query.age}`);
  console.log(req.params);
  console.log(`your id is :${req.params.userId}, and your name is ${req.params.name}`);
  res.send({first_name:"aryan",last_name:"khanna"});
})



app.listen(3000,()=>{
  console.log("your server is listing successfully on port 3000....");
});