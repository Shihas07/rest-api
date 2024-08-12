
  const jwt=require("jsonwebtoken")
  require('dotenv').config()
  

  const adminAuth=async(req,res,next)=>{
      const token=req.cookies.admin_jwt
      console.log("adinauth",token)
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token pls login" });
      }

      req.user = decoded;
      next()

      })

         
     
  }


  module.exports=adminAuth;