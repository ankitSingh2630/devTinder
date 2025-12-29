const mongoose = require('mongoose');
const validator = require('validator');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

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
        trim:TransformStreamDefaultController
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(" Invalid email address: "+value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password ")
            }
        }
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
        default:"https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error ("Invalid photo url: "+value)
            }
        }
    },
    about:{
        type:String,
        default:" This is a default about of the user"
    },
    skills:{
        type:[String],
        validate:{
            validator: (arr)=> arr.length <=10,
            message:"Maximum 10 skills allowed"
        }

    }

 },{timestamps:true});

//  create token
 userSchema.methods.getJWT= async function(){
    const user=this;

    const token = jwt.sign({_id:user._id},"ankit@1234@abc",{
        expiresIn:"1d"
    });
    return token;    
 }

//  validate password

userSchema.methods.validatePassword = async function(passwordGetByUser){
    const user=this;
    const hashedPassword=user.password;

    const isPasswordValid = await bcrypt.compare(passwordGetByUser,hashedPassword)

    return isPasswordValid;

}

 const User=mongoose.model("User",userSchema);

 module.exports=User;
