import React from "react"
import { View } from "react-native"
import { DefaultWrapper } from "../../components/DefaultWrapper"
import { GameText } from "../Game/GameText"
import { currencyMask } from "../../tools/currencyMask"
import { colors } from "../../style/colors"
import { MOBILE, ORIENTATION } from "../../tools/orientation"
import { HistoryContainer } from "./HistoryContainer"
import { Button } from "react-native-paper"
import { MenuButton } from "../MainMenu/MenuButton"
import { scale } from "../../tools/scale"

interface WalletProps {}

export const Wallet: React.FC<WalletProps> = ({}) => {
    const balance = 1000

    return (
        <DefaultWrapper>
            <View style={[{ flex: 1, gap: scale(30), padding: scale(30), paddingTop: 0 }]}>
                <View style={[{ alignItems: "center", gap: 15 }]}>
                    <GameText style={[{ fontSize: scale(40), fontWeight: "bold" }, MOBILE && { fontSize: 30 }]}>Carteira</GameText>
                    <GameText style={[{ color: colors.success, fontSize: scale(44), fontWeight: "bold" }, MOBILE && { fontSize: 40 }]}>
                        {currencyMask(balance)}
                    </GameText>
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
