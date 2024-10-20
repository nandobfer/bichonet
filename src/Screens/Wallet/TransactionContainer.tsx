import React from "react"
import { View } from "react-native"
import { GameText } from "../Game/GameText"
import { formatTransactionType } from "../../tools/formatTransactionType"
import { currencyMask } from "../../tools/currencyMask"
import { ORIENTATION } from "../../tools/orientation"
import { colors } from "../../style/colors"
import { TransactionItem, TransactionType } from "../../types/TransactionItem"

interface TransactionContainerProps {
    transaction: TransactionItem
}

export const TransactionContainer: React.FC<TransactionContainerProps> = ({ transaction }) => {
    const is_adding = transaction.transactionType === TransactionType.DEPOSIT
    console.log(transaction.createdAt)

    return (
        <View style={[{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
            <View style={[{ gap: 10 }]}>
                <GameText style={[{ fontWeight: "bold" }]}>{formatTransactionType(transaction)}</GameText>
                <GameText style={[{ fontSize: 15 }, ORIENTATION === "mobile" && { fontSize: 14 }]}>
                    {new Date(transaction.createdAt + "").toLocaleString("pt-br", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        timeZone: "UTC",
                    })}
                </GameText>
            </View>
            <GameText style={[{ fontWeight: "bold" }, is_adding && { color: colors.success }]}>
                {is_adding ? "+ " : "- "}
                {currencyMask(transaction.amount)}
            </GameText>
        </View>
    )
}
