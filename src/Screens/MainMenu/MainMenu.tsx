import React from "react"
import { View } from "react-native"
import { colors } from "../../style/colors"
import { Header } from "./Header"
import { Drawer } from "./Drawer"

interface MainMenuProps {}

export const MainMenu: React.FC<MainMenuProps> = ({}) => {
    return (
        <View style={[{ flex: 1, backgroundColor: colors.background }]}>
            <Header />
            <Drawer />
        </View>
    )
}
