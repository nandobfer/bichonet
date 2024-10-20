import { useContext, useMemo } from "react"
import UserContext from "../contexts/userContext"
import { useLinkTo, useNavigation } from "@react-navigation/native"
import { api } from "../backend/api"
import { useKeepConnected } from "./useKeepConnected"
import { User } from "../types/User"
import { AuthResponse } from "../types/AuthResponse"
import { TransactionItem } from "../types/TransactionItem"

export const useUser = () => {
    const context = useContext(UserContext)
    const navigation = useNavigation<any>()
    const linkTo = useLinkTo()
    const keepConnected = useKeepConnected()

    const authorized_headers = useMemo(() => ({ Authorization: `Bearer ${context.accessToken}` }), [context.accessToken])

    const onLogin = (auth: AuthResponse, externalRoute?: { path: string; query: any }) => {
        context.setUser(auth.user)
        context.setAccessToken(auth.access_token)
        linkTo("/inicio")

        if (externalRoute) {
            setTimeout(() => navigation.push(externalRoute.path, externalRoute.query), 200)
        }
    }

    const logout = async () => {
        keepConnected.changeValue(false)
        context.setUser(null)
        linkTo("/")
    }

    const refresh = async () => {
        try {
            const response = await api.get("/user", { params: { id: context.user?.id } })
            context.setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchBalance = async () => {
        try {
            const response = await api.get("/wallet", { headers: authorized_headers })
            return Number(response.data.balance)
        } catch (error) {
            console.log(error)
            return 0
        }
    }

    const fetchTransactions = async () => {
        try {
            const response = await api.get("/wallet-transaction", { headers: authorized_headers })
            return response.data as TransactionItem[]
        } catch (error) {
            console.log(error)
        }

        return []
    }

    const handleNotUser = () => {
        linkTo("/")
    }

    return { ...context, onLogin, logout, refresh, fetchBalance, authorized_headers, fetchTransactions, handleNotUser }
}
