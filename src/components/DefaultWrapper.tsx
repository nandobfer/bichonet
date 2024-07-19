import React from "react"
import { View } from "react-native"
import { colors } from "../style/colors"
import { ORIENTATION } from "../tools/orientation"
import { Header } from "../Screens/MainMenu/Header"
import { Drawer } from "../Screens/MainMenu/Drawer"

interface DefaultWrapperProps {
    children: React.ReactNode
}

export const DefaultWrapper: React.FC<DefaultWrapperProps> = ({ children }) => {
    return (
        <View
            style={[
                { flex: 1, backgroundColor: colors.background, overflow: "hidden" },
                ORIENTATION == "desktop" && { width: 600, alignSelf: "center", position: "static" },
            ]}
        >
            <Header />

            {children}

            <Drawer />
        </View>
    )
}
