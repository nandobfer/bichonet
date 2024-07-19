import { useContext } from "react"
import UserContext from "../contexts/userContext"
import { useLinkTo, useNavigation } from "@react-navigation/native"
import { api } from "../backend/api"
import { useKeepConnected } from "./useKeepConnected"
import { User } from "../types/User"
import { AuthResponse } from "../types/AuthResponse"

export const useUser = () => {
    const context = useContext(UserContext)
    const navigation = useNavigation<any>()
    const linkTo = useLinkTo()
    const keepConnected = useKeepConnected()

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

    const refreshNotifications = async () => {
        if (!context.user) return
        try {
            const response = await api.get("/user/notifications", { params: { user_id: context.user.id } })
            // @ts-ignore
            context.setUser((user) => ({ ...user, notifications: response.data }))
        } catch (error) {
            console.log(error)
        }
    }

    const sendViewedNotification = async (notification_id: string) => {
        try {
            const response = await api.post("/notification/viewed", { id: notification_id })
            context.updateNotification(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return { ...context, onLogin, logout, refresh, sendViewedNotification, refreshNotifications }
}
