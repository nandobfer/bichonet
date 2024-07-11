import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useEffect, useState } from "react"
import React from "react"
import { User } from "../types/server/class"

interface UserContextValue {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    expoPushToken: string
    setExpoPushToken: React.Dispatch<React.SetStateAction<string>>
    updateNotification: (notification: Notification) => void
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export default UserContext

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [expoPushToken, setExpoPushToken] = useState("")

    const updateNotification = (notification: Notification) => {
        // @ts-ignore
        setUser((user) => ({ ...user, notifications: [...user?.notifications.filter((item) => item.id != notification.id), notification] }))
    }

    const saveLocally = async () => {
        await AsyncStorage.setItem("user", JSON.stringify(user))
    }

    const fetchLocallySavedUser = async () => {
        const data = await AsyncStorage.getItem("user")
        if (data) {
            const user = JSON.parse(data) as User
            setUser(user)
        }
    }

    useEffect(() => {
        fetchLocallySavedUser()
    }, [])

    useEffect(() => {
        saveLocally()
    }, [user])

    return <UserContext.Provider value={{ user, setUser, expoPushToken, setExpoPushToken, updateNotification }}>{children}</UserContext.Provider>
}
