const express =require('express');
const User = require("../models/user")
const bcrypt= require('bcrypt');
const validator = require('validator');
const {validateSignupData}= require('../utils/signupValidation');


const authRouter=express.Router();

authRouter.post("/signup", async (req,res)=>{
    try {  
        // validation of the data 
        const{firstName,lastName,emailId,password} = req.body;
        validateSignupData(req);
        
        // encryption of the data 
        const hashedPassword= await bcrypt.hash(password,10);

        // create a new instance of the User Model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashedPassword
        })
        await user.save();
        res.send("User created successfully")

    } catch (error) {
        res.status(400).send("ERROR: "+ error.message)    
    }
})

authRouter.post("/login",async(req,res)=>{
    try {
       const {emailId,password} = req.body;

    // validate the emailId
       if(!validator.isEmail(emailId)){
        throw new Error("Enter a correct email address");
       }
    // check the email address is present
       const user = await User.findOne({emailId:emailId});
       if(!user){
        throw new Error("Please enter correct email and password");
       }
      
    // check the password 
    const isValidPassword = await user.validatePassword(password);
    if(!isValidPassword){
        throw new Error("Please enter correct email and password");
    }
    // create a token
    const token=await user.getJWT();

    if(!token){
        throw new Error("Token is not valid")
    }

    // set cookie
    res.cookie("token",token,{
        expires: new Date(Date.now()+ 8 * 3600000)
    })
    res.send("Login successfully user")    
    } catch (err) {
        res.status(400).send("ERROR: "+ err.message)    

    }
})

module.exports = authRouter;