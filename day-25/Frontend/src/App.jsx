import React from 'react'
import EmotionDetector from './features/Expression/components/FaceExpression'
import { RouterProvider } from 'react-router'
import {router} from "./app.routes.jsx"
import "./features/shared/styles/global.scss"

const App = () => {
  return (

   <RouterProvider router={router}/>   

    
  )
}

export default App
