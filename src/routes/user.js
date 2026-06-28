const express = require('express');
const userAuth = require('../middlewares/auth');
const ConnectionRequest=require('../models/connectionRequest');
const { connections } = require('mongoose');
const User=require('../models/user')
const SAFEDATA= "firstName lastName photoUrl about skills"

const userRouter=express.Router();

userRouter.get("/user/requests/recieved",userAuth, async(req,res)=>{
    // find all the pending request
    try{
    const loggedInUser=req.user;
    const recievedRequest=await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested"
    }).populate('fromUserId',SAFEDATA);
    res.status(200).json({
        message:"Request fetched successfully ",
        data:recievedRequest
    })
        
    }catch(err){
    res.status(400).json({
       message: "ERROR : "+ err.message
    })
}
 
});
// 
userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try
    {

    const loggedInUser=req.user;
    const connections=await ConnectionRequest.find({
        $or:[
            {toUserId:loggedInUser._id,status:"interested"},
            {fromUserId:loggedInUser._id,status:"interested"}
        ]
    }).populate("fromUserId",SAFEDATA).populate("toUserId", SAFEDATA);

    const data = connections.map((row)=> {
        if(row.fromUserId.equals(loggedInUser._id)){
            return row.toUserId;
        }
        return row.fromUserId;
    })
    
    res.status(200).json({
        message:"Get Connection successfully",
        data
    })

    }
    catch(err){
        message:"ERROR"+err.message
    }

})

userRouter.get("/feed",userAuth,async(req,res)=>{
    /**
     * User should see all the cards excepts-
     * 1- his own card
     * 2- his connections
     * 3- ignored people
     * 4- already sent the connection request
     * 
     * Example: Rahul:[mark, Donald, Mat, Yash, Virat]  - all these when rahul logins
     * r-> mark ->reject   ---->  [Donald, Mat, Yash, Virat] 
     * r-> Mat interested ----> [Donald,  Yash, Virat] 
     */

   try{
    const loggedInUser=req.user;

    const page=parseInt(req.query.page)|| 1;
    const limit=parseInt(req.query.page) || 10;

    // limit = limit >50 ? 50 : limit; 

    const skip = (page - 1) * limit;


    const connectionRequests = await ConnectionRequest.find({
        $or:[
            {fromUserId:loggedInUser._id},
            {toUserId:loggedInUser._id}
        ]
    }).select("fromUserId toUserId ")

    const hideUserData = new Set();

    connectionRequests.forEach((request) => {
        hideUserData.add(request.fromUserId.toString());
        hideUserData.add(request.toUserId.toString());
    });

    const usersFeed= await User.find({
        $and: [
            {
              _id: { $nin: Array.from(hideUserData)}
            },
            {
                _id: {$ne: loggedInUser._id}
            }
        ]
    }).select(SAFEDATA)
    .skip(skip)
    .limit(limit)

    res.send(usersFeed);

   }
   catch(err){
    return res.status(400).json({
        message:err.message
    })
   }


})



module.exports=userRouter;