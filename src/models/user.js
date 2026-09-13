const mongoose=require("mongoose");


// you can also do const {Schema} =require("mongoose");
// direct destruct the shcema
const userSchema=mongoose.Schema({
  firstName:{
    type:String,
  },
  lastName:{
    type:String,
  },
  emailId:{
    type:String,
  },
  password:{
    type:String,
  },
  age:{
    type:Number,
  },
  gender:{
    type:String
  }
});
//  this model will create a collection with the userSchema properties
module.exports=mongoose.model("User",userSchema);

// now we will create the post api for inserting the userData
// we going to create post/signup api 