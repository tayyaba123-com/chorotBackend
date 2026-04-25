import { register, login, getUser } from "../service/auth.api";
import { setError, setLoading, setUser } from "../state/auth.slice";
import { useDispatch } from "react-redux"


export const useAuth = () => {

    const dispatch = useDispatch()

    async function handleRegister({ email, password, fullname, contact, isSeller = false }) {

        const data = await register({ email, password, fullname, contact, isSeller })

        dispatch(setUser(data.user))

        return data.user
    }

    async function handleLogin({ email, password }) {

        const data = await login({ email, password })


        dispatch(setUser(data.user))

        return data.user

    }

    async function handleGetUser() {
        try {

            dispatch(setLoading(true))
            const data = await getUser()
            dispatch(setUser(data.user))
        } catch (err) {
            dispatch(setError(err))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return { handleRegister, handleLogin, handleGetUser }
}