import axios from 'axios'

//axios instance
const authAPiInstance = axios.create({
    baseURL: '/api/auth',
    withCredentials: true
})

export async function register({ email, password, fullname, contact, isSeller }) {

    const response = await authAPiInstance.post("/register", {
        email,
        password,
        fullname,
        contact,
        isSeller
    })

    return response.data
}

export async function login({ email, password }) {

    const respose = await authAPiInstance.post("/login", {
        email,
        password
    })


    return respose.data
}