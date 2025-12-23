const express = require("express");

const app = express();
const {adminAuth , userAuth}= require("./middlewares/auth")

app.use("/admin",adminAuth);

app.get("/user/login",(req,res)=>{
    res.send("user login successful")
})

app.get("/user/data",userAuth,(req,res)=>{
    res.send("user data sent")
})

app.get("/admin/getAllUser",(req,res)=>{
    // getting authaurised by token
    
        res.send("Data successfully sent")

})

app.get("/admin/deleteUser",(req,res)=>{
    // getting authaurised by token
    res.send("Deleted a user");
})



app.listen(3000,()=>{
    console.log("app is running on 3000 ...")
});