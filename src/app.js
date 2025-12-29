const express = require("express");
const connectDB = require("./config/database")
const cookieParser= require('cookie-parser');


const app = express();
app.use(cookieParser())
app.use(express.json());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);



connectDB().then(()=>{
    console.log("Connection successfully established");
    app.listen(3000,()=>{
    console.log("app is running on 3000 ...")
});
}).catch((err)=>{
    console.log("Connection is not established successfully",err.message);
})

