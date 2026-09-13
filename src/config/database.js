const mongoose=require('mongoose');

// mongoose.connect("mongodb+srv://khannaaryan460_db_user:5G4djLKLdMw071f1@cluster0.vkyniyj.mongodb.net/")
// the anove steps are required to connect the mongodb cluster ***(not the databse)
// the link above refers the cluster 
// mongoose.connect() returns a Promise. so use await
// and do all the async jobs in try catch block reason-(what if mongodb collection failed)
// if you add the name of the database to teh end of the string then it will refer to the database
// good way of doing this

const connectDB= async ()=>{
  await mongoose.connect(
    "mongodb+srv://khannaaryan460_db_user:5G4djLKLdMw071f1@cluster0.vkyniyj.mongodb.net/devTinder"
  )
}

// very imp
// once your database connection has been successfully established then do app.listen()

module.exports={
  connectDB,
}