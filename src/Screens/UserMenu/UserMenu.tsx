import React from "react"
import { View } from "react-native"
import { Text } from "react-native-paper"
import { colors } from "../../style/colors"
import { currencyMask } from "../../tools/currencyMask"
import { MenuButton } from "../MainMenu/MenuButton"
import { useLinkTo } from "@react-navigation/native"
import { DefaultMenuWrapper } from "../../components/DefaultMenuWrapper"
import { MyLink } from "./MyLink"

interface UserMenuProps {}

export const UserMenu: React.FC<UserMenuProps> = ({}) => {
    const linkTo = useLinkTo()
    const balance = 100

    return (
        <DefaultMenuWrapper>
            <Text style={[{ color: colors.secondary, alignSelf: "center", fontSize: 20 }]}>
                CŔEDITO: <Text style={[{ color: balance > 0 ? colors.success : colors.error, fontWeight: "bold" }]}>{currencyMask(balance)}</Text>
            </Text>

            <MenuButton onPress={() => linkTo("/jogar")}>JOGAR</MenuButton>
            <MenuButton>VER MEU JOGO</MenuButton>
            <MenuButton onPress={() => linkTo("/carteira")}>CARTEIRA</MenuButton>

            <MyLink />
        </DefaultMenuWrapper>
    )
}
