import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const App = () => {

   const [notes, setNotes] = useState([
    {
    title:"test title 1",
    discription:"test discription 1"
   },
   {
    title:"test title 2",
    discription:"test discription 2"
   },
   {
    title:"test title 3",
    discription:"test discription 3"
   },
   {
    title:"test title 4",
    discription:"test discription 4"
   },
  ])
  
  axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
  // console.log(res.data.notes)
  setNotes(res.data.notes)
  })

  return (
    <div >
    
      <div className="notes">
        {
          notes.map(note=>{
           return <div className="note">
          <h1>{note.title}</h1>
          <p>{note.discription}</p>
        </div>
          })
        }
       
      </div>
     </div>
  )
}

export default App