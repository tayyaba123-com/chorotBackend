import { configureStore } from "@reduxjs/toolkit";
import counterReducer  from "./slices/counterslice"
import themeReducer from "./slices/themeslice"

export const store = configureStore({
    reducer:{
        counter: counterReducer,
        theme: themeReducer
    }
})