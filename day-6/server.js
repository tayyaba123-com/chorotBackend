
require("dotenv").config()

const app = require("./src/app")
const mongoose=require("mongoose")


function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to Database")
    })
}

connectToDb()

app.listen(3000,()=>{
    console.log("server is runing on port 3000")
})