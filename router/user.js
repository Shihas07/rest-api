const express = require("express");
const router = express.Router();

const UserController = require("../controller/user");
// const User = require("../model/user");
const userAuth=require("../midilware/userAuth")

router.get("/",userAuth, UserController.home);
router.get("/signup", UserController.getSignup);
router.post("/signup", UserController.signup);
router.get("/login", UserController.getLogin);
router.post("/login", UserController.postLogin);
router.post("/logout",UserController.postLogout)

module.exports = router;
