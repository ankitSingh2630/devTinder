const express = require('express');
const userAuth=require('../middlewares/auth')

const requestRouter=express.Router();

requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    try{
    const user=req.user; 
    console.log("connection request sent");
    res.send(user.firstName+" connection request sent");
    }
    catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }
})

module.exports = requestRouter;