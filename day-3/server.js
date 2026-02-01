const express = require("express");

const app = express();

app.use(express.json());

const notes = [
  //   {
  //     title: "Strange Me 1",
  //     discription: "ones upon a time,when i.... 1",
  //   },
  //   {
  //     title: "Strange Me 2",
  //     discription: "ones upon a time,when i.... 2",
  //   },
];

app.post("/notes", (req, res) => {
  notes.push(req.body);
  console.log(req.body);
  console.log("Success! Someone just hit the /notes endpoint.");

  res.send("note cretaed ");
});

app.get('/notes',(req,res)=>{
   res.send(notes)
})

app.listen(3000, () => {
  console.log("server is runing on port 3000");
});
