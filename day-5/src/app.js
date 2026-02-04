const express = require("express");

const app = express();

let notes = [];

// post api

app.use(express.json())
app.post("/notes", (req, res) => {
     notes.push(req.body);
//   res.send("note created");
  res.status(201).json({
    message:"Note creataed successfuly "
  })
});

app.get("/notes", (req, res) => {
    res.status(200).json({
        notes:notes
    })
});

app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index]
  res.status(204).json({
    message:"Noete succesfuly deleted"
  })
//   res.send("Noete succesfuly deleted");
});

app.patch("/notes/:index", (req, res) => {
  for (let key in req.body) {
    if (key == "age") {
      notes[req.params.index].age = req.body.age;
      res.status(200).json({
        message:`${key} updated`
      })
    } else if(key==="name") {
      notes[req.params.index].name = req.body.name;
      res.status(200).json({
        message:`${key} updated`}
    )
    }
  }
});

// app.put('/notes')

module.exports = app;
