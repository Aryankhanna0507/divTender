const mongoose=require("mongoose");


// you can also do const {Schema} =require("mongoose");
// direct destruct the shcema

// apply some strict checkes in the database itself
// we will add some strict in the database schema if these checks are not match then it will not store the data
// for more what kind of checks we apply you can refer the mongoose documentation schema types
const userSchema=mongoose.Schema({
  firstName:{
    type:String,
    required:true,  // if firstName is not present then mongoose will not allow to insertion of this database 
    minLenght:4,
    maxLenght:50
  },
  lastName:{
    type:String,
    minLength:4,
    maxLenght:20
  },
  emailId:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password:{
    type:String,
    required:true,
    minLength:8,
    maxLength:20
  },
  age:{
    type:Number,
    min:18
  },
  gender:{
    type:String,
    lowercase:true,
    // gender is either male , female or others 
    // how to add custom validation function
    // validate(value){
    //   if(!['male','female','other'].includes(value)){
    //     throw new Error("Gender data is not valid!");
    //   }
    // }
    // instead of this we can also do it like this

    enum:{
      values:["male","female","other"],
      message:`{VALUE} is not supported`
    }

// it is only be called when the object is created it is not call at the time of updation
  },
  photo:{
    type:String,
    default:"https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
  },
  skills:{
    type:[String],
    // applying a validator for skill does not contain more than 5 values and all the values must be uniqe
    // just for learing purpose 
    // but this type of validation is not a good way
    // validate:[
    //   {
    //     validator:(value)=>{
    //        return value.length<=5;
    //     },
    //     message:"can not have more than 5 skills"
    //   },
    //   {
    //     validator:(value)=>{
    //       const unique=new Set(value);
    //       return value.length==unique.size;
    //     },
    //     message:"skills must be unique"
    //   }
    // ]
  },
},

// if you want to add the timestamp 
// we can also do this by using createdAt:{type:Date}....or somthing similar to this 
// by using the timestamp node do everything 
// make a habit to always create a timestamp
{
  timestamps:true
}
);
//  this model will create a collection with the userSchema properties
module.exports=mongoose.model("User",userSchema);

// now we will create the post api for inserting the userData
// we going to create post/signup api 