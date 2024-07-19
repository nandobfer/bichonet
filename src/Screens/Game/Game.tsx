import { RouteProp } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import { ActivityIndicator, Surface, Text, TextInput } from "react-native-paper"
import { DefaultWrapper } from "../../components/DefaultWrapper"
import { game_list } from "../GameList/game_list"
import { colors } from "../../style/colors"
import { PrizeComponent } from "./PrizeComponent"
import { isPrizeSelected } from "../../tools/isPrizeSelected"
import { ORIENTATION } from "../../tools/orientation"
import { GameText } from "./GameText"
import { currencyMask } from "../../tools/currencyMask"
import { BetInput } from "./BetInput"
import { BetInputButton } from "./BetInputButton"
import { getQuotes } from "../../tools/getQuotes"
import { QuoteResponse } from "../../types/QuoteResponse"
import { calculateQuote } from "../../tools/calculateQuote"
import { BetKeyboard } from "./BetKeyboard"

interface GameProps {
    route: RouteProp<any, any>
}

export const Game: React.FC<GameProps> = ({ route }) => {
    const game_type = route.params?.tipo
    const game = game_list.find((item) => item.path == game_type)

    const [betNumber, setBetNumber] = useState("")
    const [selectedPrizes, setSelectedPrizes] = useState(0)
    const [betValue, setBetValue] = useState(1)
    const [quotes, setQuotes] = useState<QuoteResponse[]>([])

    const handleChangeValue = (typed: string) => {
        const numeric = typed.match(/\d/g)
        if (numeric?.length == typed.length || !typed) {
            setBetNumber(typed)
        }
    }

    const handlePressPrize = (prize_unix: number) => {
        let current_prizes = selectedPrizes
        const is_selected = isPrizeSelected(prize_unix, selectedPrizes)
        setSelectedPrizes(is_selected ? (current_prizes -= prize_unix) : (current_prizes += prize_unix))
    }

    const handleBetValueSum = (sum: number) => {
        if (betValue + sum < 1) return

        setBetValue((value) => value + sum)
    }

    const fetchQuotes = async () => {
        if (!game) return
        const quotes = await getQuotes(game.type)

        if (quotes) {
            setQuotes(quotes)
        }
    }

    const resetGame = () => {
        setQuotes([])
        setBetNumber("")
        setBetValue(1)
        setSelectedPrizes(0)
    }

    const onNumberPress = (digit: number) => {
        setBetValue((value) => Number((value * 10 + digit / 100).toFixed(2)))
    }
    const onDeletePress = () => {
        setBetValue((value) => Math.floor(value * 10) / 100)
    }
    const onConfirmPress = () => {}

    useEffect(() => {
        resetGame()
        if (game) {
            fetchQuotes()
        }
    }, [game])

    return game ? (
        <DefaultWrapper>
            <View style={[{ paddingHorizontal: 30, gap: 20 }]}>
                <Surface style={[{ backgroundColor: colors.primary, borderRadius: 15, justifyContent: "center", alignItems: "center", padding: 10 }]}>
                    <Text style={[{ fontSize: 30, fontWeight: "bold", color: colors.background }]}>{game.label}</Text>
                </Surface>

                <BetInput value={betNumber} onChangeText={handleChangeValue} keyboardType="number-pad" maxLength={game.max_chars} />

                <GameText>Selecione os prêmios:</GameText>

                <FlatList
                    horizontal
                    data={new Array(game.prizes).fill(1).map((_, index) => Math.pow(2, index))}
                    renderItem={({ item, index }) => (
                        <PrizeComponent
                            prize_number={index + 1}
                            value={item}
                            selected={isPrizeSelected(item, selectedPrizes)}
                            onPress={handlePressPrize}
                        />
                    )}
                    contentContainerStyle={[{ gap: 5, flex: 1, justifyContent: "space-between" }]}
                />

                <GameText>Insira o valor da aposta:</GameText>

                <View style={[{ position: "relative" }]}>
                    <BetInput value={currencyMask(betValue)} onChangeText={handleChangeValue} readOnly small_number={ORIENTATION === "mobile"} />
                    <View
                        style={[
                            {
                                position: "absolute",
                                left: 15,
                                flexDirection: "row",
                                gap: 5,
                                height: "100%",
                                alignItems: "center",
                                width: "100%",
                                justifyContent: "space-between",
                                paddingRight: 30,
                            },
                        ]}
                    >
                        <BetInputButton value={-100} onPress={handleBetValueSum} disabled={betValue === 1} />
                        <BetInputButton value={100} onPress={handleBetValueSum} />
                    </View>
                </View>

                {!!quotes.length ? (
                    <GameText>
                        Premiação:{"  "}
                        <FlatList
                            horizontal
                            data={quotes}
                            renderItem={({ item }) => (
                                <GameText style={[{ color: colors.success, fontWeight: "bold" }]}>
                                    {currencyMask(calculateQuote(betValue, item.valor))}
                                </GameText>
                            )}
                            contentContainerStyle={[{ gap: 8, paddingVertical: 5 }]}
                            ItemSeparatorComponent={() => <GameText style={{ marginLeft: 8 }}>e</GameText>}
                        />
                    </GameText>
                ) : (
                    <ActivityIndicator color={colors.success} />
                )}

                <BetKeyboard onNumberPress={onNumberPress} onConfirmPress={onConfirmPress} onDeletePress={onDeletePress} />
            </View>
        </DefaultWrapper>
    ) : null
}
