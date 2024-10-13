import React, { useCallback, useEffect, useState } from "react"
import { View } from "react-native"
import { ActivityIndicator, Text } from "react-native-paper"
import { colors } from "../../style/colors"
import { currencyMask } from "../../tools/currencyMask"
import { MenuButton } from "../MainMenu/MenuButton"
import { useFocusEffect, useLinkTo } from "@react-navigation/native"
import { DefaultMenuWrapper } from "../../components/DefaultMenuWrapper"
import { MyLink } from "./MyLink"
import { scale } from "../../tools/scale"
import { useUser } from "../../hooks/useUser"

interface UserMenuProps {}

export const UserMenu: React.FC<UserMenuProps> = ({}) => {
    const linkTo = useLinkTo()
    const { user, fetchBalance } = useUser()

    const [loading, setLoading] = useState(true)
    const [balance, setBalance] = useState(0)

    const requestBalance = async () => {
        setLoading(true)
        const balance = await fetchBalance()
        setBalance(balance)
        setLoading(false)
    }

    useFocusEffect(
        useCallback(() => {
            requestBalance()
        }, [user])
    )

    return (
        <DefaultMenuWrapper>
            <Text style={[{ color: colors.secondary, alignSelf: "center", fontSize: scale(20) }]}>
                SALDO:{"  "}
                {loading ? (
                    <ActivityIndicator color={colors.success} size={scale(20)} />
                ) : (
                    <Text style={[{ color: balance > 0 ? colors.success : colors.error, fontWeight: "bold" }]}>{currencyMask(balance)}</Text>
                )}
            </Text>

            <MenuButton onPress={() => linkTo("/jogar")}>JOGAR</MenuButton>
            <MenuButton>VER MEU JOGO</MenuButton>
            <MenuButton onPress={() => linkTo("/carteira")}>CARTEIRA</MenuButton>

            <MyLink />
        </DefaultMenuWrapper>
    )
}
