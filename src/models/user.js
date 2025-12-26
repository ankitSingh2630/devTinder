const mongoose = require('mongoose');

 const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20,
        trim:true

    },
    lastName:{
        type:String,
        minlength:3,
        maxlength:20,
        trim:true 
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:15
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("gender is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
    },
    about:{
        type:String,
        default:" This is a default about of the user"
    },
    skills:{
        type:[String]
    }

 },{timestamps:true});

 const User=mongoose.model("User",userSchema);

 module.exports=User;
