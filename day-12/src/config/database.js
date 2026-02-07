const mongoose =require("mongoose")


function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("conneted to DB")
    })
}

module.exports=connectToDB