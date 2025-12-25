const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user")

const app = express();

app.use(express.json());

app.post("/signup", async (req,res)=>{
    
    const user = new User(req.body);

    try {    
    await user.save();
    res.send("User created successfully")
    } catch (error) {
        res.status(400).send("Error saving the user ", error.message)    
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
        res.status(400).send("Something went wrong");
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

    } catch (error) {
        res.status(400).send("Something went wrong");

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

