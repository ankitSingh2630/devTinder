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

connectDB().then(()=>{
    console.log("Connection successfully established");
    app.listen(3000,()=>{
    console.log("app is running on 3000 ...")
});
}).catch((err)=>{
    console.err("Connection is not established successfully");
})

