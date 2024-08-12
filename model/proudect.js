
  const mongoose=require("mongoose")

  const produectSchema= new mongoose.Schema({
       name:{
         type:"string",
          required:true
       },
       size:{
         type:"string",
         required:true
       },
       price:{
        type:Number,
         required:true
       }
  })

   const produect=mongoose.model("proudect",produectSchema)
    module.exports=produect
    