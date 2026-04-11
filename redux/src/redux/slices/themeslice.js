import { createSlice } from "@reduxjs/toolkit";
import reducer from "./counterslice";

export const themeSlice = createSlice({
    name:'theme',
    initialState:{value:"white"},
    reducers:{
        darktheme:(state)=>{state.value = "black"},
        lighttheme:(state)=>{state.value = "white"}
    }
})

export const {darktheme,lighttheme} = themeSlice.actions //action = task to be performend.
export default themeSlice.reducer