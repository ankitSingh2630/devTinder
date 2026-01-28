const express = require('express');
const userAuth=require('../middlewares/auth')
const {validateEditProfile}= require('../utils/signupValidation');
const User = require('../models/user');
const bcrypt=require('bcrypt');

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

// profile edit
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

// forgot password
profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
    const {previousPassword,password}=req.body;

    const loggedInUser=req.user;

    const checkPassCorrect = await loggedInUser.validatePassword(previousPassword);  
     if(!checkPassCorrect){
        throw new Error("Please enter correct email and password");
    }     
   
    const hashedPassword = await bcrypt.hash(password,10);

     loggedInUser.password=hashedPassword;
     await loggedInUser.save();

     res.send("password has been changed successfully");

})


// previos password - req.body



module.exports= profileRouter;