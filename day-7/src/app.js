const  express=require("express")
const noteModel = require("./model/notes.model")

const app=express()

app.use(express.json())

// get req.body=> title,discription
app.get("/notes",async(req,res)=>{

    const {title,discription}=req.body
   const note= await noteModel.create({
        title,discription
    })

    res.status(201).json({
        message:"note created successfuly",
        note
    })
})

module.exports=app