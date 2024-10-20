import React, { useCallback, useState } from "react"
import { FlatList, View } from "react-native"
import { TransactionContainer } from "./TransactionContainer"
import { scale } from "../../tools/scale"
import { TransactionItem } from "../../types/TransactionItem"
import { useUser } from "../../hooks/useUser"
import { useFocusEffect } from "@react-navigation/native"

interface HistoryContainerProps {}

export const HistoryContainer: React.FC<HistoryContainerProps> = ({}) => {
    const { user, fetchTransactions } = useUser()

    const [transactions, setTransactions] = useState<TransactionItem[]>([])

    const requestTransactions = async () => {
        const transactions = await fetchTransactions()
        setTransactions(transactions)
    }

    useFocusEffect(
        useCallback(() => {
            requestTransactions()
        }, [user])
    )

    return (
        <FlatList
            data={transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())}
            renderItem={({ item }) => <TransactionContainer transaction={item} />}
            style={[{ marginHorizontal: scale(-30), marginVertical: scale(-10) }]}
            contentContainerStyle={[{ paddingVertical: scale(10), paddingHorizontal: scale(30), gap: scale(30), flex: 1 }]}
        />
    )
}
