const express = require("express");

const app = express();

app.use("/hello",(req,res)=>{
    res.send("dev tender from server")
})

app.use("/",(req,res)=>{
    res.send("Hello Hello ....!")
})

app.listen(3000,()=>{
    console.log("app is running on 3000 ...")
});