import { createContext, useState } from "react"
import React from "react"
import { Animated, Dimensions } from "react-native"

export interface Drawer {}

interface DrawerContextValue {
    menuDrawer: boolean
    setMenuDrawer: React.Dispatch<React.SetStateAction<boolean>>
    toggleDrawer: () => void
    width: number
    translateX: Animated.Value
}

interface DrawerProviderProps {
    children: React.ReactNode
}

const DrawerContext = createContext<DrawerContextValue>({} as DrawerContextValue)

export default DrawerContext

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
    const width = Dimensions.get("screen").width

    const [menuDrawer, setMenuDrawer] = useState(false)

    const [translateX] = useState(new Animated.Value(width))

    const toggleDrawer = () => {
        Animated.timing(translateX, {
            toValue: menuDrawer ? width : 0,
            duration: 300,
            useNativeDriver: true,
        }).start()
        setMenuDrawer((value) => !value)
    }

    return <DrawerContext.Provider value={{ menuDrawer, setMenuDrawer, toggleDrawer, width, translateX }}>{children}</DrawerContext.Provider>
}
