const  express=require("express")
const noteModel = require("./model/notes.model")

const app=express()

app.use(express.json())

// post  /notes  req.body=> title,discription
app.post("/notes",async(req,res)=>{

    const {title,discription}=req.body
   const note= await noteModel.create({
        title,discription
    })

    res.status(201).json({
        message:"note created successfuly",
        note
    })
})

//get /notes 
//fetches the data

app.get("/notes",async(req,res)=>{
   const notes = await noteModel.find()
    
   res.status(200).json({
    message:"notes fetched successuly",
    notes
   })
 
})

module.exports=app