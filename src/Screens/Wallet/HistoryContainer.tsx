import React from "react"
import { FlatList, View } from "react-native"
import { TransactionResponse } from "../../types/TransactionResponse"
import { TransactionContainer } from "./TransactionContainer"

interface HistoryContainerProps {}

export const HistoryContainer: React.FC<HistoryContainerProps> = ({}) => {
    const transactions: TransactionResponse[] = [
        { amount: 17, type: 0, datetime: "1657844400000" },
        { amount: 199, type: 2, datetime: "1658212200000" },
        { amount: 43, type: 0, datetime: "1658025600000" },
        { amount: 52, type: 3, datetime: "1657508400000" },
        { amount: 26, type: 1, datetime: "1657671200000" },
        { amount: 73, type: 2, datetime: "1657773200000" },
        { amount: 64, type: 0, datetime: "1658390400000" },
        { amount: 88, type: 3, datetime: "1658256000000" },
        { amount: 21, type: 1, datetime: "1657934400000" },
        { amount: 6, type: 0, datetime: "1658118000000" },
        { amount: 30, type: 2, datetime: "1657833000000" },
        { amount: 14, type: 3, datetime: "1657660200000" },
        { amount: 91, type: 1, datetime: "1658200800000" },
        { amount: 58, type: 0, datetime: "1658047200000" },
        { amount: 37, type: 2, datetime: "1658188200000" },
    ]

    return (
        <FlatList
            data={transactions.sort((a, b) => Number(b.datetime) - Number(a.datetime))}
            renderItem={({ item }) => <TransactionContainer transaction={item} />}
            style={[{ marginHorizontal: -30, marginVertical: -10 }]}
            contentContainerStyle={[{ paddingVertical: 10, paddingHorizontal: 30, gap: 30, flex: 1 }]}
        />
    )
}
