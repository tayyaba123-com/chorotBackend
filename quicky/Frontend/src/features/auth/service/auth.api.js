import axios from 'axios'

//axios instance
const authAPiInstance = axios.create({
    baseURL:'http://localhost/3000/api/auth',
    withCredentials:true
})

export async function register({email,password,fullname,contact,isSeller}){

    const response = await authAPiInstance.post("/register",{
        email,
        password,
        fullname,
        contact,
        isSeller
    })

    return response.data
}