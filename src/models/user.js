const mongoose=require("mongoose");
const validator=require("validator");

const userSchema=mongoose.Schema({
  firstName:{
    type:String,
    required:true,
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
    // we can do these validation using the npm validator package
    // match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    validate:(value)=>{
      if(!validator.isEmail(value)){
        throw new Error("email  is not  valid "+value);
      }
    }
  },
  password:{
    type:String,
    required:true,
    minLength:8,
    maxLength:20,
    validate:(value)=>{
      if(!validator.isStrongPassword(value)){
        throw new Error("your password is not strong: "+value);
      }
    }
  },
  age:{
    type:Number,
    min:18
  },
  gender:{
    type:String,
    lowercase:true,
    enum:{
      values:["male","female","other"],
      message:`{VALUE} is not supported`
    }

  },
  photo:{
    type:String,
    default:"https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    // we can validate weather the srtring is url or not
    validate:(value)=>{
      if(!validator.isURL(value)){
        throw new Error("Invalid photo url : "+value);
      }
    }
  },
  skills:{
    type:[String],

  },
},

{
  timestamps:true
}
);
module.exports=mongoose.model("User",userSchema);

