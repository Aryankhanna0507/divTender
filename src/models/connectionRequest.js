const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema({
  fromUserId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  toUserId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  status:{
    type:String,
    enum:{
      values:["interested","ignore","accepted","rejected"],
      message:"{VALUE} is not a correct status type"
    }
  },
  
},
{timestamps:true}
);

// making the compound schema 

// connectionRequestSchema.index({fromUserId:1});
// now if i will ever do 

// connectionRequestSchema.index({fromUserId:39478672839234223243454}) then it will run very fast

// but we have to do someting like that 
// connectionRequestSchema.index({fromUserId:39478672839234223243454,toUserId:43979349394799692983439});

// so for this i have make a compound index of two fields 

connectionRequestSchema.index({fromUserId:1,toUserId:1});// instead of 1 you can put many values read the documentation

// ex let suppose you have to find the users based on the firstName and lastName and there is million of users in our database so it will be very beneficial for us to make a compoud index for both the values like this
// User.index({firstName:1,lastName:1})
// and do the query like this 
// User.find({firstName:"aryan",lastName:"khanna"});
// you can read more mongodb website just search on google compound index

// some more info 


// MongoDB supports multiple independent indexes as well as compound indexes. An independent index indexes one field separately, such as {firstName: 1} or {email: 1}, while a compound index indexes multiple fields together, such as {firstName: 1, lastName: 1, email: 1}. A compound index follows the leftmost-prefix rule, meaning an index {a: 1, b: 1, c: 1} can efficiently support queries involving a, a+b, or a+b+c, but generally not queries using only b or c. You can have many indexes on a collection, but indexes consume storage and make write operations more expensive, so they should be created according to the application's query patterns rather than simply indexing every field.
 
// learn about the mongodb queries more

// user can not send the request to himself
// we can add this logic in api section also but for learning purpsose how we user the pre method 


connectionRequestSchema.pre("save",function(next){
  const connectionRequest=this;
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
     throw new Error("can not send the request to yourself!!");
  }
  next();
})

const connectionRequestModel=new mongoose.model("connectionReqeustModel",connectionRequestSchema);

module.exports={
connectionRequestModel
}


