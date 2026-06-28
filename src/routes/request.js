const express = require('express');
const userAuth=require('../middlewares/auth')
const ConnectionRequest=require('../models/connectionRequest')
const User=require('../models/user');
const userRouter = require('./user');

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

requestRouter.post('/requset/review/:status/:requestId',userAuth,async (req,res)=>{
try {
    const loggedInUser=req.user;
    const{status,requestId}=req.params;
    // check/validate the status
    const isAlowed=['accepted','rejected'];
    const isAlowedStatus= isAlowed.includes(status);

    if(!isAlowedStatus){
        throw new Error("Invalid status type :"+status)
    }

    //checks the requestId
    const connectionRequest= await ConnectionRequest.findOne({
        _id:requestId,
        status:"interested",
        toUserId:loggedInUser._id
    })
    if(!connectionRequest){
        throw new Error("Connection request is not found");
    }

    connectionRequest.status=status;
    const data =await connectionRequest.save();

    res.status(200).json({
        message:"ConnectionRequest status updated successfully",data
    })
} catch (err) {
    res.status(400).send("ERROR: "+ err.message);
}

});



module.exports = requestRouter;