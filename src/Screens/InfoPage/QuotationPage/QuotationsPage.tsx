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
import { ORIENTATION, WEB } from "../../../tools/orientation"
import { scale } from "../../../tools/scale"

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
            <View style={[{ padding: scale(30), gap: scale(15), flex: 1 }]}>
                <View style={[{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
                    <GameText style={[{ fontSize: 30 }, WEB && { fontSize: scale(40) }]}>Cotações</GameText>
                    {loading && <ActivityIndicator color={colors.success} />}
                </View>

                <FlatList
                    data={quotes}
                    renderItem={({ item }) => <QuoteComponent quote={item} />}
                    contentContainerStyle={[{ gap: scale(30), paddingVertical: scale(10) }]}
                />
            </View>
        </DefaultWrapper>
    )
}
