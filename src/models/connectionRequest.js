const mongoose=require ('mongoose');

const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        enum:{
            values:["interested","ignored","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        }
    }

},
{Timestamps:true}
);


connectionRequestSchema.index({fromUserId:1,toUserId:1});

connectionRequestSchema.pre('save',function(){
    const user=this;
    if(user.fromUserId.equals(user.toUserId)){
        throw new Error("You can not send request to yourself...")
    }

});
const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports=ConnectionRequestModel;

