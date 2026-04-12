import './App.css'
import { routes } from './app.routes.jsx'
import { RouterProvider } from 'react-router'

const App = () => {
  return (
    <>
    <RouterProvider router={routes} ></RouterProvider>
    </>
    
  )
}

export default App