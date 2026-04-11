import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { darktheme, lighttheme } from '../redux/slices/themeslice'

const Navbar = () => {

    const theme = useSelector((state)=>state.theme.value)
    const dispatch = useDispatch()
  return (
    <div>
        <h1>Cueent theme is {theme}</h1>

        <button onClick={()=>{
            dispatch(darktheme())
        }}>Dark theme</button>

        <button onClick={()=>{
            dispatch(lighttheme())
        }}>Light theme</button>
        

    </div>
  )
}

export default Navbar