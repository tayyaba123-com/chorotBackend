// server create kerna

// configure server


const express=require("express")

const app=express()


let notes=[]

app.use(express.json())


//post

app.post('/notes',(req,res)=>{
    res.send("note created")
    notes.push(req.body)  
})

//get

app.get('/notes',(req,res)=>{    
    res.send(notes)
})

//delete
app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index]
    res.send("note deleted succesfuly")
   
})

//discription upadate
app.patch('/notes/:index',(req,res)=>{
 notes[req.params.index].disription=req.body.disription
 res.send("note updated succesfuly")
}) 

module.exports=app