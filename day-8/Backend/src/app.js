const express = require("express");
const noteModel = require("./model/notes.model");

const app = express();

app.use(express.json());

/*
- POST
- /api/notes
- req.body => {title,discription}
*/

app.post("/api/notes", async (req, res) => {
  const { title, discription } = req.body;

  const notes = await noteModel.create({
    title,
    discription,
  });

  res.status(201).json({
    message: "note created successfuly",
    notes,
  });
});

/*
- GET
- /api/notes
- notes fetched api
*/

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();
  res.status(200).json({
    message:"notes fetched successfuly ",
    notes
  });
});

/*
- DELETE
- /api/notes:id
- notes DELTEING API
*/

app.delete("/api/notes/:id",async(req,res)=>{
    const id=req.params.id.trim()
    
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"note deleted successfuly"
    })
})

/**
 * PATCH
 * /api/notes/:id
 * updates the discription
 * req.body => {discription}
 */

app.patch("/api/notes/:id",async(req,res)=>{
  const id=req.params.id
  const {discription}=req.body
  await noteModel.findByIdAndUpdate(id,{discription});
  

  res.status(200).json({
    message:"notes updated successfuly"
  })
}) 

module.exports = app;
