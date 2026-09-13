const {userAuth,adminAuth}=require("./middlewares/auth.js");
const express=require("express");
const {connectDB}=require("./config/database.js");
const app=express(); 
// first of get the user model
const User=require("./models/user.js");



// for stroing the data the request will be as a post reqeust
app.post("/signup",async (req,res)=>{
  // // create dummy user obeject
  // // const userObj={
  // //   firstName:"aryan",
  // //   lastName:"khanna",
  // //   emailId:"khannaryan460@gmail.com",
  // //   password:"aryan@123"
  // // };
  // // // i want to store that user into our mongodb databse user model for thsi we need to create the instance of our model

  // // // creating the new instance of the user model using the nwew keyword then pass the data of that model
  // // const user= new User(userObj)

  // // i can do these things as the following way
  // const user=new User({
  //   firstName:"aryan",
  //   lastName:"khanna",
  //   emailId:"khannaaryan460@gmail.com",
  //   password:"abc@123",
  //   age:21,
  //   gender:"male",
  //   // remember in our user schema we did not create any field as require so it is possible to have only firstName ,lastName,emailId,password .....
  // })
  // // User({...})->means-:Create a new document instance using the User model and initialize it with these values.
  // // You can think of User as a class/constructor function provided by Mongoose.
  // // It only creates the Mongoose document in memory.it does not save it for save we have to do .save()
  // // till now we i have created the user of type User means i have created the instance of the user
  // // i have created the instance of my user model now the next job is to save it 
  // await user.save() // this will return us a promise. so you should use await and because you are using await make the function async
  // res.send("user added successsfully");

// whenever do any operation to the database (whenever interact the database) reading from it storing in it anything....
// try to do in try catch block it is a good prectice 
  const user = new User({
    firstName:"aryan",
    lastName:"khanna",
    emailId:"khannaaryan460@gmail.com",
    password:"abc@123",
    age:21,
    gender:"male"
  });
try {
  await user.save();
  res.send("data added to the database!!");
} catch (error) {
  res.status(401).send("unable to adding the data to the database!!"+error.message);
}


})
  
// once your database connection has been successfully established then do app.listen()
connectDB().then(()=>{
  // here you should do app.listen
  // first connect the databse then start the server to accept the reqeust
  // if first you start the server  then connect the database then there may be a chance your database is not connected successfully and server is taking the request for database interaction so this is the problem 
  console.log("your database has been connected successfully....");
  app.listen(3000,()=>{
    console.log("your serer is listing successfully on port:30000....");
  })
}).catch((err)=>{
  console.log("failed to connect the database!!!!");
})


// here you should not do app.listen 
// app.listen(3000,()=>{
//   console.log("your server is listing successfully on port 3000....");
// });