import { createSlice } from "@reduxjs/toolkit";
//slice means ,inner store in the main store, it is used to manage a specific part of the state
//like shoe store in a bid mole

export const counterslice = createSlice({
name:'counter',
initialState:{value:0},
reducers:{
    increment:(state)=>{state.value+=1},
    decrement:(state)=>{state.value-=1},
    incrementbyten:(state)=>{state.value+=10}
}
})

export const {increment,decrement,incrementbyten} = counterslice.actions

export default counterslice.reducer