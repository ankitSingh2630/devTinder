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
        res.status(400).send("Error saving the user "+ error.message)    
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

