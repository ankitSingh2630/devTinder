const validator=require('validator');

const validateSignupData=(req)=>{
    const{firstName,lastName,emailId,password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Enter a valid name");
    }
    else if (!validator.isEmail(emailId)) {
         throw new Error("Email address is incorrect");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a Strong password")
        
    } 
}

module.exports={validateSignupData};