import React from "react"
import { View } from "react-native"
import { DefaultWrapper } from "../../components/DefaultWrapper"
import { GameText } from "../Game/GameText"
import { currencyMask } from "../../tools/currencyMask"
import { colors } from "../../style/colors"
import { ORIENTATION } from "../../tools/orientation"
import { HistoryContainer } from "./HistoryContainer"
import { Button } from "react-native-paper"
import { MenuButton } from "../MainMenu/MenuButton"

interface WalletProps {}

export const Wallet: React.FC<WalletProps> = ({}) => {
    const balance = 1000

    return (
        <DefaultWrapper>
            <View style={[{ flex: 1, gap: 30, padding: 30, paddingTop: 0 }]}>
                <View style={[{ alignItems: "center", gap: 15 }]}>
                    <GameText style={[{ fontSize: 40, fontWeight: "bold" }, ORIENTATION === "mobile" && { fontSize: 30 }]}>Carteira</GameText>
                    <GameText style={[{ color: colors.success, fontSize: 44, fontWeight: "bold" }, ORIENTATION === "mobile" && { fontSize: 40 }]}>
                        {currencyMask(balance)}
                    </GameText>
                </View>

                <GameText style={[{ fontSize: 26, fontWeight: "bold" }, ORIENTATION === "mobile" && { fontSize: 24 }]}>
                    Histórico de transações
                </GameText>

                <HistoryContainer />

                <View style={[{ flexDirection: "row", gap: 30 }]}>
                    <MenuButton style={{ flex: 1 }}>Sacar</MenuButton>
                    <MenuButton style={{ flex: 1 }} buttonColor={colors.success}>
                        Depositar
                    </MenuButton>
                </View>
            </View>
        </DefaultWrapper>
    )
}
