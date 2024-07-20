import React, { useEffect, useState } from "react"
import { DefaultWrapper } from "../../../components/DefaultWrapper"
import { GameText } from "../../Game/GameText"
import { QuoteResponse } from "../../../types/QuoteResponse"
import { getQuotes } from "../../../tools/getQuotes"
import { FlatList, View } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { colors } from "../../../style/colors"
import { QuoteComponent } from "./QuoteComponent"
import { game_list } from "../../GameList/game_list"
import { ORIENTATION } from "../../../tools/orientation"

interface QuotationsPageProps {}

export const QuotationsPage: React.FC<QuotationsPageProps> = ({}) => {
    const [quotes, setQuotes] = useState<QuoteResponse[]>([])
    const [loading, setLoading] = useState(true)

    const fetchQuotes = async () => {
        const quotes = await getQuotes()
        if (quotes) {
            setQuotes(quotes.filter((item) => game_list.find((game) => game.type === item.tipo)))
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchQuotes()
    }, [])

    return (
        <DefaultWrapper>
            <View style={[{ padding: 30, gap: 15, flex: 1 }]}>
                <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                    <GameText style={[{ fontSize: 30 }, ORIENTATION === "desktop" && { fontSize: 40 }]}>Cotações</GameText>
                    {loading && <ActivityIndicator color={colors.success} />}
                </View>

                <FlatList
                    data={quotes}
                    renderItem={({ item }) => <QuoteComponent quote={item} />}
                    contentContainerStyle={[{ gap: 30, paddingVertical: 10 }, ORIENTATION === "mobile" && { gap: 30 }]}
                />
            </View>
        </DefaultWrapper>
    )
}
