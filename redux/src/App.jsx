import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementbyten } from './redux/slices/counterslice'
import Navbar from './componenets/Navbar'

const App = () => {

  const num = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()


  return (
    <div className="app">

      <div className="clock"><h1>{num}</h1></div>

      <div className="buttons">
        <button
          onClick={() => {
            dispatch(increment())
          }}>
          Increment
        </button>

        <button
          onClick={() => {
            dispatch(decrement())
          }}>
          Decrement
        </button>

        <button
          onClick={() => {
            dispatch(incrementbyten())
          }}>
          Increment by 10
        </button>

      </div>

<Navbar/>
    </div>

  )
}

export default App