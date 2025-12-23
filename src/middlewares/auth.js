 const adminAuth = (req,res,next)=>{
    const token ="xyz";
    const isAuthorized = "xyz" === token ;

    if(!isAuthorized){
        res.status(401).send("Unauthorised");
    }
    console.log("checking middleware")
    next();
}

const userAuth = (req,res,next)=>{
    const token ="xyz";
    const isAuthorized = "xyz" === token ;

    if(!isAuthorized){
        res.status(401).send("Unauthorised");
    }
    console.log("checking middleware")
    next();
}

module.exports ={adminAuth , userAuth}