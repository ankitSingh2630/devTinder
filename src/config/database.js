const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://ankitsingh275126:ankitsingh275126@cluster0.ddj1fcx.mongodb.net/devTinder");
}

module.exports = connectDB;