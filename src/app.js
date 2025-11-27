const express = require("express");

const app = express();

app.get("/user",(req,res)=>{
    res.send({firstName:"Ankit ",lastName:"Singh"})
})

app.post("/user",(req,res)=>{
    res.send("Data successfully saved to the database")
})

app.delete("/user",(req,res)=>{
    res.send("Data successfully deleted to the database")
})

app.listen(3000,()=>{
    console.log("app is running on 3000 ...")
});