import './App.css'
import { routes } from './app.routes.jsx'
import { RouterProvider } from 'react-router'
import { useEffect } from 'react'
import { useAuth } from '../features/auth/hook/useAuth.js'
import { useSelector } from 'react-redux'

const App = () => {
  const { handleGetUser } = useAuth()

  const user = useSelector(state => state.auth.user)
  console.log(user);

  useEffect(() => {

    handleGetUser()
  }, [])


  return (
    <>
      <RouterProvider router={routes} />
    </>

  )
}

export default App