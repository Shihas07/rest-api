
  const jwt=require("jsonwebtoken")
  require('dotenv').config()

    const userAuth=async(req,res,next)=>{
    
      const token = req.cookies.user_jwt
         console.log("userAuth",token)
         jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
              return res.status(401).json({ message: "Invalid token pls login" });
          }

          
          req.user = decoded;
          next(); 
      });
        
    }

    module.exports=userAuth