const express = require('express');
const userAuth=require('../middlewares/auth')
const ConnectionRequest=require('../models/connectionRequest')
const User=require('../models/user')

const requestRouter=express.Router();

requestRouter.post("/send/:status/:toUserId",userAuth,async(req,res)=>{
  
    try{
    const user=req.user; 
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;
    const allowedStutus=["interested","ignored"];
    const isAllowedStatus=allowedStutus.includes(status);

    if(!isAllowedStatus){
        throw new Error("Invalid status type :"+status);
    }
    const isToUserExist= await User.findById(toUserId);
    // console.log(isToUserExist);
    if(!isToUserExist){
        throw new Error("User is not exist in DB");
    }

    const existingConnection= await ConnectionRequest.findOne({
        $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
        ]
    })

    
    if(existingConnection){
        throw new Error("Connection already exist");
    }
    

    const connectionRequestdata= await ConnectionRequest.create({
        fromUserId,
        toUserId,
        status
    })
    res.json({
        message:user.firstName+" is "+status+" in "+isToUserExist.firstName,
        data:connectionRequestdata
    })
    }
    catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }
})

module.exports = requestRouter;