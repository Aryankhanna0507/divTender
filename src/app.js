const express=require("express");

const app=express(); // here we are creating express js application
// // we are creating web server 
// // now we have to listen on some port so that anybody connect with it 

// app.use("/test",(req,res)=>{ // this function is called request handler
//   res.send("hello from the server!")
// })
app.use("/hello",(req,res)=>{
  res.send("hello  hello hello");
})
// // put this / (slash code) at the end otherwise non of the route will get execute (it will overwrite every other route)
// app.use("/",(req,res)=>{
//   res.send("this is by default if you do not add / ");
// })

// app.get -> this method is only for handling the http method get api calls reqeust
app.get("/user",(req,res)=>{
  console.log(req.url);
  console.log(req.method);
  res.send({first_name:"aryan",last_name:"khanna"});
})
// for post only 
app.post("/user",(req,res)=>{
//  saving data to databse
  res.send("data successfully saved to the database")
})
app.delete("/user",(req,res)=>{
  res.send("delete the data");
})
// this is match all  the http method(get,post,patch,put) api calls to the /test
// means give the same response for the get and other request that we send on url starting localhost:3000/test
app.use("/test",(req,res)=>{ // this function is called request handler
  res.send("hello from the server!")
});

app.listen(3000,()=>{
  console.log("your server is listing successfully on port 3000....");
});