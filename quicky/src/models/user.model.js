import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true ,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
        trim:true,
    },
    contact:{
        type:String,
        required:true,
        trim:true,
    },
    role:{
        type:String,
        enum:["buyer","seller"],
        default:"buyer",
        trim:true,
    },

})

userSchema.pre('save',async function(){
    if(!this.isModified('password'))  return ;
     this.password = await bcrypt.hash(this.password,10);
    
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

const userModel = mongoose.model("user",userSchema);

export default userModel;