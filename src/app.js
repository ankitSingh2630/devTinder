const express = require("express");

const app = express();




app.use("/user",[(req,res,next)=>{
    console.log("Request Handler for User")
    // res.send("Response")
    next()
    // res.send("Response")
},
(req,res,next)=>{
    console.log("Request Handler for User 2")
    // res.send("Response2")
    next()
},
(req,res,next)=>{
    console.log("Request Handler for User 3")
    // res.send("Response 3")
    next()
}],
[(req,res,next)=>{
    console.log("Request Handler for User 4")
    // res.send("Response 4")
    next()
},
(req,res,next)=>{
    console.log("Request Handler for User 5")
    res.send("Response 5")
    next()
}]
);



app.listen(3000,()=>{
    console.log("app is running on 3000 ...")
});