const express = require("express");

const app = express();



app.get("/abcd",(req,res)=>{
    console.log(req.query)
    res.send({firstName:"Ankit ",lastName:"Singh"})
})

app.post("/user",(req,res)=>{
    console.log("Saving data to the DB")
    res.send("Data successfully saved to the DB")
})

app.delete("/user", (req,res)=>{
    res.send(" Deleted Successfully !")
})

app.listen(3000,()=>{
    console.log("app is running on 3000 ...")
});