const express =require("express")
const noteModel=require("./models/notes.model")
const app =express()

app.use(express.json())

// -post notes
//    - request.body=> {title,discription}

app.post("/notes", async(req,res)=>{
    const {title,discription}=req.body

   const note=await noteModel.create({
        title,discription
    })

    res.status(201).json({
        message:"note has been created successfuly",
        note
    })
})

module.exports=app