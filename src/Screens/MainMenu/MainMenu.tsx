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
import { useLinkTo } from "@react-navigation/native"
import { DefaultWrapper } from "../../components/DefaultWrapper"

interface MainMenuProps {}

export const MainMenu: React.FC<MainMenuProps> = ({}) => {
    const linkTo = useLinkTo()
    const { user } = useUser()

    const balance = 100

    return (
        <DefaultWrapper>
            <View style={[{ paddingHorizontal: 30, gap: 20 }]}>
                <Text style={[{ color: colors.secondary, alignSelf: "center", fontSize: 20 }]}>
                    CŔEDITO: <Text style={[{ color: balance > 0 ? colors.success : colors.error, fontWeight: "bold" }]}>{currencyMask(balance)}</Text>
                </Text>

                <MenuButton onPress={() => linkTo("/jogar")}>JOGAR</MenuButton>
                <MenuButton>VER MEU JOGO</MenuButton>
                <MenuButton>CARTEIRA</MenuButton>
                <MenuButton>MEU LINK</MenuButton>
            </View>
        </DefaultWrapper>
    )
}
