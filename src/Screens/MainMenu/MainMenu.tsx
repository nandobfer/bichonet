import React from "react"
import { View } from "react-native"
import { colors } from "../../style/colors"
import { Header } from "./Header"
import { Drawer } from "./Drawer"
import { useUser } from "../../hooks/useUser"
import { MenuButton } from "./MenuButton"
import { Text } from "react-native-paper"
import { currencyMask } from "../../tools/currencyMask"
import { ORIENTATION } from "../../tools/orientation"

interface MainMenuProps {}

export const MainMenu: React.FC<MainMenuProps> = ({}) => {
    const { user } = useUser()
    const balance = 100

    return (
        <View style={[{ flex: 1, backgroundColor: colors.background, overflow: "hidden" }, ORIENTATION == "desktop" && { paddingHorizontal: 600 }]}>
            <Header />

            <View style={[{ paddingHorizontal: 30, gap: 20 }]}>
                <Text style={[{ color: colors.secondary, alignSelf: "center", fontSize: 20 }]}>
                    CŔEDITO: <Text style={[{ color: balance > 0 ? colors.success : colors.error, fontWeight: "bold" }]}>{currencyMask(balance)}</Text>
                </Text>

                <MenuButton>JOGAR</MenuButton>
                <MenuButton>VER MEU JOGO</MenuButton>
                <MenuButton>CARTEIRA</MenuButton>
                <MenuButton>MEU LINK</MenuButton>
            </View>

            <Drawer />
        </View>
    )
}
