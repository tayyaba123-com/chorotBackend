import { register } from "../service/auth.api";
import { setError, setLoading, setUser } from "../state/auth.slice";
import {useDispatch} from "@reduxjs/toolkit"


export const useAuth = () => {

     const dispatch  = useDispatch()

    async function handleRegister({email,password,fullname,contact,isSeller = false}){

        const data  = await register({email,password,fullname,contact,isSeller})

        dispatch(setUser(data.user))
    }

    return {handleRegister}
}