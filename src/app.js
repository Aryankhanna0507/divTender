const express=require("express");

const app=express(); 

// remember one route can also have multiple route handler
app.get("/user",(req,res,next)=>{
  // route 1
// if you will not add any res then it will become infinite req and after certain time time out will be hit and there is no response
console.log("handling the route!1");
res.send("First Response!");
// if you would not write res in route 1 then it go to route 2 (<-(this statement is wrong) it does not happen we will be again in infinite loop)
// for going the 2nd route you have to add one more parameter which is next then do the next()-> it will call the next route handler
// next();
// if it encounter the res.anyResponseFunction() then it does not directly just end the function after sending the response it runs the remaining code and then if it found  the next() and that next route handler also has a res.anyResponseFunction then it will give error because we already have send the response (we are trying to send the response to the same request it gives error because that tcp connection has been closed ) 
},(req,res)=>{
  // route 2
  console.log("handling the request!2");

  res.send("Second Response");
  // next()->it will give you an error because here express expect one more route handler (it give can not get/user  )
  // very imp-> instead of multiple route handler you can also send the array of function (route handler )
  // the signature look like-;
  // app.use("/route",rH1,rH2,rH3,rH4,rH5........); normal
  // app.use("/route",[rH1,rH2,rH3,rH4,rH5........]); array 
  // app.use("/route",[rH1,rH2],rH3,rH4,rH5........); array for first two remains as it is 
  // not only for use it will work for all 
});



app.listen(3000,()=>{
  console.log("your server is listing successfully on port 3000....");
});