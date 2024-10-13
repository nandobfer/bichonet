import React, { useCallback, useState } from "react"
import { View } from "react-native"
import { DefaultWrapper } from "../../components/DefaultWrapper"
import { GameText } from "../Game/GameText"
import { currencyMask } from "../../tools/currencyMask"
import { colors } from "../../style/colors"
import { MOBILE, ORIENTATION } from "../../tools/orientation"
import { HistoryContainer } from "./HistoryContainer"
import { ActivityIndicator, Button } from "react-native-paper"
import { MenuButton } from "../MainMenu/MenuButton"
import { scale } from "../../tools/scale"
import { useUser } from "../../hooks/useUser"
import { useFocusEffect } from "@react-navigation/native"

interface WalletProps {}

export const Wallet: React.FC<WalletProps> = ({}) => {
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
        <DefaultWrapper>
            <View style={[{ flex: 1, gap: scale(30), padding: scale(30), paddingTop: 0 }]}>
                <View style={[{ alignItems: "center", gap: 15 }]}>
                    <GameText style={[{ fontSize: scale(40), fontWeight: "bold" }, MOBILE && { fontSize: 30 }]}>Carteira</GameText>
                    {loading ? (
                        <ActivityIndicator color={colors.success} size={scale(40)} />
                    ) : (
                        <GameText style={[{ color: colors.success, fontSize: scale(44), fontWeight: "bold" }, MOBILE && { fontSize: 40 }]}>
                            {currencyMask(balance)}
                        </GameText>
                    )}
                </View>

                <GameText style={[{ fontSize: scale(26), fontWeight: "bold" }, MOBILE && { fontSize: 24 }]}>Histórico de transações</GameText>

                <HistoryContainer />

                <View style={[{ flexDirection: "row", gap: scale(30) }]}>
                    <MenuButton style={{ flex: 1 }}>Sacar</MenuButton>
                    <MenuButton style={{ flex: 1 }} buttonColor={colors.success}>
                        Depositar
                    </MenuButton>
                </View>
            </View>
        </DefaultWrapper>
    )
}
