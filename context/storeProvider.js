import {StoreContext} from "./createStore";
import axios from "axios";
import {NEXT_API} from "@/config/index";
import {useEffect, useReducer, useState} from "react";
import {useRouter} from "next/router";
import {useErrorHook} from "@/customHook/useErrorHook";
import {reducerState} from "@/context/reducerState";


const initialState = {
    allCart: {
        color: {},
        size: {},
        brand: {},
        minPrice: {},
        maxPrice: {}
    },
}

export default function StoreProvider({children}) {

    const [state, dispatch] = useReducer(reducerState, initialState)
    const [user, setUser] = useState(null)
    const [filterOrderData, setFilterOrderData] = useState([])
    const [infoText , setInfoText] = useState('')

    const [error, setError] = useErrorHook()
    const router = useRouter()

    useEffect(() => {
        const time = setTimeout(() => {
            setInfoText('')
        }, 2500)
        return () => clearTimeout(time)
    }, [infoText])




    useEffect(() => checkUser(),[])

    const login = async ({email: identifier, password}) => {
        try {
            const {data: {user}} = await axios.post(`${NEXT_API}/api/login`, {identifier, password})
            // router.push('/orders')
            setUser(user)
        } catch (err) {
            setError(err.response.data.message)
        }

    }

    const register = async ({username, email, password}) => {
        try {
            const {data: {user}} = await axios.post(`${NEXT_API}/api/register`, {username, email, password})
            setUser(user)
            router.push('/')
        } catch (err) {
            setError(err.response.data.message)

        }
    }

    const checkUser = async () => {
        try {
            const {data: {user}} = await axios.get(`${NEXT_API}/api/user`)
            setUser(user)
        } catch (err) {
            console.log(err)
        }
    }
    const logout = async () => {
        try {
            const {data} = await axios.post(`${NEXT_API}/api/logout`)
            router.push('/')
            setUser(null)
        } catch (err) {
            console.log(err)
        }
    }
    const getOrders = async () => {
        try {
            const {data: {data: ordersData}} = await axios.get(`${NEXT_API}/api/orders`)
            return ordersData
        } catch (err) {
            console.log(err)
        }
    }
    const getToken = async () => {
        try {
            const {data: {token}} = await axios.get(`${NEXT_API}/api/check`)
            return token
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <StoreContext.Provider value={{
            user,
            login,
            logout,
            getOrders,
            register,
            getToken,
            filterOrderData,
            setFilterOrderData,
            error,
            setError,
            state,
            dispatch,
            infoText ,
            setInfoText
        }}>
            {children}
        </StoreContext.Provider>
    )
}