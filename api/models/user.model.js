import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,  
    },
    avatar:{
        type:String,
        default:"https://static.thenounproject.com/png/363640-200.png",  
    },
    resume:{
        type:String,
        default:"",
    }
},
{timestamps:true}
);

const User=mongoose.model('User',userSchema);
export default User;