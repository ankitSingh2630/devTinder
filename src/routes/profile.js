const express = require('express');
const userAuth=require('../middlewares/auth')
const {validateEditProfile}= require('../utils/signupValidation')

const profileRouter = express.Router();

//  API - Profile
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
    const user=req.user;
    res.send(user);
    }catch(err){
        res.status(400).send("ERROR: "+ err.message); 
    }
})

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{

        // validate data 
        if(!validateEditProfile(req)){
            throw new Error('Enter valid field');
        }
    
        const loggedInUser= req.user;

        Object.keys(req.body).forEach((key)=>{
            loggedInUser[key]=req.body[key]
        })

        await loggedInUser.save();
        res.send('Profile edit successful');
    }catch(err){
        res.status(400).send("ERROR: "+ err.message); 
    }
})

module.exports= profileRouter;