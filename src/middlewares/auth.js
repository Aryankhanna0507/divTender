// creating the authe middleware
const userAuth=(res,req,next)=>{
  const token="xyz";
  const isAthenticated=token=="xyz";
  if(!isAthenticated){
    res.status(401).send("user is not authenticated");
  }else{
    console.log("user is authenticated");
    next();
  }
}
// simmilarly we can create a admin auth 
const adminAuth=(res,req,next)=>{
  const token="xyz";
  const isAthenticated=token=="xyz";
  if(!isAthenticated){
    res.status(401).send("admin is not authenticated");
  }else{
    console.log("admin is authenticated");
    next();
  }
}
module.exports={
  userAuth,
  adminAuth
}