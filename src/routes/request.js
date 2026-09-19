const express=require("express");
const {userAuth}=require("../middlewares/auth.js");
const {User}=require("../models/user.js")
const {connectionRequestModel:connectionRequest}=require("../models/connectionRequest.js")
const requestRouter=express.Router();

requestRouter.post("/send/request/:status/:userId",userAuth,async (req,res)=>{
  try{
    const fromUserId=req.user._id;
    const toUserId=req.params.userId;
    const status=req.params.status;
    if(!["interested","ignored"].includes(status)){
      throw new Error("invalid status value");
    }

    // the method below work fine but when the data base size increase it will become expensive 
    // what if there are 1e4 people in dentinder and they are sending request to 100 then database size will be 1e6 then at this time findOne query will be very expensive 
    // when you scale the project then dp related query will become very expensive
    // so we will create a index of a particular field in the collection 
    //in our case we will make the index to email id 
    // if we will not make email id as index then whenever user do the login then database seach for that user one by one (becasue we are doing findOne(emailid)) so we should make the index of email id in this case 
    // during data base schema when you make a field as unque then mongodb make a index for that feild 
    // i can apply the email id unique logic on the user databas 
    // and for this connection request i can apply the index:true on the fromUserId

    // but here is a problem that we are quering on both toUserId and fromUserId so i have to make the index to both of them compound index 
    // so we did this in the schema file go and check  it out 
    const connectionRequestExist=await connectionRequest.findOne({
      $or:[
        {
          fromUserId,
          toUserId
        },
        {
          fromUserId:toUserId,
          toUserId:fromUserId
        }
      ]
    });
    if(connectionRequestExist){
      throw new Error("the coonnection request already exist");
    }
    const connection=new connectionRequest({
      fromUserId,
      toUserId
    });
    // now if the connection request dost exist all the status value is correct and user is not sendintg the connection to himself then we can add in the database
    await connection.save();
    res.json({
      message:"the reqeust is send successfully!",
      connection
    })
  }catch(err){
    res.status(400).send("somthing went wrong:"+err.message);
  }
})

module.exports={
  requestRouter
}