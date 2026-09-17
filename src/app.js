const {userAuth}=require("./middlewares/auth.js");
const express=require("express");
const {connectDB}=require("./config/database.js");
const {validataSignupData}=require("./utils/validation.js")
const bcrypt=require("bcrypt");
const validator=require("validator");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");

const app=express(); 

const User=require("./models/user.js");
app.use(express.json()); 
app.use(cookieParser())
// create post/signup api 
app.post("/signup",async (req,res)=>{
  try {
  // sign up api should be very secure
  
 // validation of the data    
    validataSignupData(req);
  // encrypt the password  
  const {firstName,lastName,emailId,password}=req.body;
  const passwordHash=await bcrypt.hash(password,10);
  console.log(passwordHash);
  
  // dont write the logic for validation and other things here just write the logic for only api  create a differtent folder named utiles and put these exrtra logic in that folder

  // creating the new instance of the user model
  // never directly store everythign in req.body it may contain "xyz":"kuch bhi"
  // only store the tings that have meaning for you
  const user=new User({
    firstName,
    lastName,
    emailId,
    password:passwordHash
  });
  console.log(user);
  await user.save();
  res.send("signed in successfully!");
  
} catch (error) {
  res.status(400).send(error.message);

}
})

// creating the login api

app.post("/login",async (req,res)=>{
  try{
    const {emailId,password}=req.body;
    const isValidEmail=validator.isEmail(emailId);
    if(!isValidEmail){
      throw new Error("Invalid credentials");
    }
    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid credentials")
    }
    // const isValidPassword=bcrypt.compare(password,user.password);
    // we can also ofload this

    const isValidPassword=user.validatePassword(password);

    if(!isValidPassword){
      throw new error("Invalid credentials")
    }
    // create a jwt token 

    // two parameters first what data you want to hide and second one is the key (key is depends on you and you can send any key) the thrid parameter tells in how much the token will be expires
    // const token=jwt.sign({_id:user._id},"DEV@tinder$123$",{expiresIn:"1d"});
    // every time when i loging in i always create a jwt token for that user and i am passing this id {_id:user._id} every time , i am securing or secretly injecting this id into the token, so this method is very closely related to the user , every user will have a jwt token , every user will have differnt way of signing the token (mtlb:-kyonki ye har ek particular user ke liye alag hai usse hi juda hua hai) so we can offload this in the user schema with the help of shema methods 
    // everything work fine in this way but offloading this to the schema method is a good practice 
    // instead of this we will just do 

    const token=await user.getJWT();

    console.log(token);//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YWE5OGFlNGRkN2M0ODUzZDM0ZDk1NTciLCJpYXQiOjE3ODk1NjYxMTV9.08Kck45n3qVsOWCEXKFT3I7s8NJ3XIYYtgSxw_1MDVQ -> it will give me this type of information and it has the the user id hidden in it 
    // add the token to the cookie and send the response back to the user 

    // we can also send more parameter like expires and httpOnly(our api only work for http request)
    // read the documentation
    res.cookie('token',token,{expires:new Date(Date.now()+7*3600000),httpOnly:true});
    res.send("Login successfully!");
  }catch(err){
    res.status(400).send("login Failed:"+err.message);
  }
})

app.get("/profile",userAuth,async (req,res)=>{
  try{
  //   // whenever my profile api is called i need to first validate the user means i need to first validate the cookie
  // const cookies=req.cookies;
  // // console.log(cookies); it will give undefined because for reading the cookie we need a npm library we need a cookie parser to reed the cookie So-
  // // we need a middleware which is known as a cookie parser it is similar to express.json its used for cookie
  // // after addding the cookie-parser middleware it starts working correctly
  // const {token}=cookies;
  //   //  validate my token
  // console.log(cookies); 
  // console.log(token);// it will give me same the same token that i send to user at the time of login 
  // // you can learn about it more on the official site jwt.io
  // // if token is invalid
  // if(!token){
  //   throw new Error('Invalid token');
  // }
  // const decodedMessage=await jwt.verify(token,"DEV@tinder$123$");
  // console.log(decodedMessage);// it will give me the same id that i hide while making the jwt token user._id

  // // now i can just get the _id(now i have the infromation about user who has logged in)
  // const {_id}=decodedMessage;
  // console.log("logged in user is: "+_id);

  // // now lets find the user itself 
  // const user=await User.findById({_id});
  // if(!user){
  //   res.send(401).send("user not found")
  // }
  // console.log(user);

  // the above commented code is for authenticattin but we use middleware for it 
  const user=req.user;
  res.send({
    message:"got the user profile",
    user
  });
  } catch(err){
    res.status(401).send("something went wrong:"+err.message);
  } 
})

// creating the api to establish the connection request

app.post("/sendConnectionRequest",userAuth,async (req,res)=>{
  try{
    const user=req.user;
    res.send(user.firstName+"  sending the connection request");
  }catch(err){
    res.status(400).send("user not log in")
  }
})






// commenting out all the api we create these api only for the learning purpose  


// // get the user using the email id 
// app.get("/user",async (req,res)=>{
//   try{
//       const {emailId}=req.body;
//       console.log(emailId);
//       const user=await User.findOne({emailId:emailId});
    
//       console.log(user);
//       if(user==null){
//         res.status(404).send("user not found!");
//       }
      
//       res.send("get the users:"+"\n"+user);
//     }catch(err){
//       res.status(400).send("can not get the user"+err)
//     }
// })

// // feed api get/feed - get all the users from the database
// app.get("/feed",async (req,res)=>{
//   try{
//     const users=await User.find();
//     if(users.length!=0){
//       res.send(users);
//     }else{
//       res.status(404).send("can not get the users");
//     }
// }catch(err){
//   res.status(400).send("something went wrong"+err);
// }
// })
// // create delete user api using findbyidanddelete app.delete

// app.delete("/delete",async (req,res)=>{
//   try {
//     const userId=req.body.userId;

//     const deletedUser=await User.findByIdAndDelete(userId);
//     if(deletedUser==null){
//       res.status(401).send("can not delete the user");
//     }
//     res.send("user deleted");
//   } catch (error) {
//     res.status(401).send("somthing went wrong"+error);
//   }
// })
// //  creat an api for updating the data app.patch 

// app.patch("/update/:userId",async (req,res)=>{
// try{
//     const userId=req.params?.userId;
//     const newData=req.body;
//     const UPDATE_ALLOWED=["age","gender","about","skills","photo"];
//     const isUPDATE_ALLOWED=Object.keys(newData).every((value)=>{
//       return UPDATE_ALLOWED.includes(value);
//     })
//     if(isUPDATE_ALLOWED===false){
//       throw new Error("update is not allowed");
//     }
//     const skills=req.body.skills;
    
//     if(newData?.skills?.length>5){
//       throw new Error("skills can not more than 5");
//     }
//     const dataUpdated= await User.findByIdAndUpdate(userId,newData,{returnDocument:'after',runValidators:true});
//     if(dataUpdated==null){
//       res.status(401).send("can not update the user");
//     }
//     console.log(dataUpdated);

//     res.send("user data has been updated");
//   }catch(err){
//     res.status(401).send("something went wrong "+err);
//   }
// })


connectDB().then(()=>{
  console.log("your database has been connected successfully....");
  app.listen(3000,()=>{
    console.log("your serer is listing successfully on port:3000....");
  })
}).catch((err)=>{
  console.log("failed to connect the database!!!!"+err.message);
})
