const adminController=require("../controller/admin")
const express=require("express")
const router=express.Router()
const adminAuth=require("../midilware/adminAuth")
 
  router.get("/",adminAuth,adminController.home)
 router.get("/signup",adminController.getsignup)
 router.post("/signup",adminController.signup)
 router.post("/login",adminController.postLogin)
 router.post("/addProduect",adminController.addProduect)
 router.get("/listProduect",adminAuth,adminController.getListProduect)
 router.delete("/delete/:id",adminAuth,adminController.deleteProduect)
 router.patch("/update",adminAuth,adminController.update)

 module.exports=router
    
 

