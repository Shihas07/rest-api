const express = require("express");
const app=express()
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 const Produects=require("../model/proudect")
 const bodyParser = require("body-parser");
 const cookieParser=require("cookie-parser")
require("dotenv").config();

app.use(bodyParser.json())
app.use(cookieParser());

// Helper function to find user by email
const findUserByEmail = async (email) => await User.findOne({ email });

const home = async (req, res) => {
    const produectList=await Produects.find()

  res.status(200).json({ message: "Success, this is the homepage",data:produectList });
};

const getSignup = (req, res) => {
  res.status(201).json({ message: "Signup page get success" });
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "No data provided" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    return res.status(201).json({ message: "Successful signup" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getLogin = (req, res) => {
  res.status(200).json({ message: "Success, you got the login page" });
};

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("user_jwt", token, { httpOnly: true, maxAge: 86400000 });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

 const postLogout=(req,res)=>{
      
     res.clearCookie("user_jwt");
   res.status(200).json({message:"succes logout"})
      //  console.log("kf")
 }

   const getProfile=async(req,res)=>{
          try{
            const token=req.cookies.user_jwt
            console.log("tojen",token)

             if(!token){
             return res.status(401).json({message:"no token provided pls login"})
             }
             const decoded = jwt.verify(token, process.env.JWT_SECRET);
             console.log(decoded)

             const user = await User.findById(decoded.userId)
               if(!user){
               return res.status(401).json({message:"invalid user"})
               }
                res.status(200).json({userDATA:user})
             console.log(user)
  
          }
          catch(error){
            return res.status(500).json({ message: "Server error", error: error.message });

          }

        
             
            
   }

module.exports = {
  home,
  signup,
  getSignup,
  getLogin,
  postLogin,
  postLogout,
  getProfile
};
