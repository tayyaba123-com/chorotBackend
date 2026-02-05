const app = require("./src/app")
const mongoose=require("mongoose")


function connectToDb(){
    mongoose.connect("mongodb+srv://tayyaba:hilana123@cluster0.86zgkxb.mongodb.net/day-6")
    .then(()=>{
        console.log("connected to Database")
    })
}

connectToDb()

app.listen(3000,()=>{
    console.log("server is runing on port 3000")
})