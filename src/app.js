const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user")
const {validateSignupData}= require('./utils/signupValidation');
const bcrypt= require('bcrypt');
const validator = require('validator');

const app = express();

app.use(express.json());

app.post("/signup", async (req,res)=>{
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
        console.log(user);

        res.send("User created successfully")

    } catch (error) {
        res.status(400).send("ERROR: "+ error.message)    
    }
})

app.post("/login",async(req,res)=>{
    try {
       const {emailId,password} = req.body;

    //    validate the emailId
       if(!validator.isEmail(emailId)){
        throw new Error("Enter a correct email address");
       }
    // check the email address is present
       const user = await User.findOne({emailId:emailId});
       if(!user){
        throw new Error("Please enter correct email and password");
       }
      
    // check the password 
    const isValidPassword = await bcrypt.compare(password,user.password);
    if(!isValidPassword){
        throw new Error("Please enter correct email and password");
    }
    res.send("Login successfully user")    
    } catch (err) {
        res.status(400).send("ERROR: "+ err.message)    

    }
})

//  API - Get user by email 

app.get("/user",async(req,res)=>{

    const userEmail = req.body.emailId;
    try{
        const user = await User.find({emailId: userEmail});
        if(!user){
        res.status(404).send("User not found");
      }
        res.send(user)
    }
    catch(err){
        res.status(400).send(err);
    }
})

// API Feed API - GET /feed - get all the users from the database.

app.get("/feed", async(req,res)=>{

    try {
        const users = await User.find();
        if(!users){
        res.status(404).send("User not found");          
    }
        res.send(users); 

    }catch (error) {
        res.status(400).send("Something went wrong");

    } 
});

app.delete("/user", async(req,res)=>{

    const userId= req.body.userId;
    try{
      const user = await User.findByIdAndDelete({_id:userId})
      if(!user){
        res.status(404).send("User not found");          

      }
      res.send(user)

    }catch (error) {
        res.status(400).send("Something went wrong");

    }

})

app.patch("/user/:userId", async(req,res)=>{
    const userId= req.params.userId;
    const data = req.body;

  try{
    const ALLOWED_UPDATES= ["photoUrl","about","skills","age","gender"];
    const isAllowedUpdates= Object.keys(data).every((k)=>
          ALLOWED_UPDATES.includes(k)
    )
    if(!isAllowedUpdates){
        throw new Error("Update not allowed");
    }
    const user = await User.findByIdAndUpdate(
        userId,
        data,
        {
            new:true,
            runValidators:true,
        }
    );
    res.send({
        data:user,
        message:"User Updated Successfully"
    });
  }
  catch (error) {
        res.status(400).send("UPDATE FAILED: "+error.message)

    }

})

connectDB().then(()=>{
    console.log("Connection successfully established");
    app.listen(3000,()=>{
    console.log("app is running on 3000 ...")
});
}).catch((err)=>{
    console.err("Connection is not established successfully");
})

