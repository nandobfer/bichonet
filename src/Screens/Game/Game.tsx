import { RouteProp } from "@react-navigation/native"
import React, { useEffect, useRef, useState } from "react"
import { Animated, FlatList, Pressable, ScrollView, TextInput, View } from "react-native"
import { ActivityIndicator, Button, Surface, Text, TouchableRipple } from "react-native-paper"
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
import { BetSubmitButton } from "./BetSubmitButton"
import { useCart } from "../../hooks/useCart"
import { BetForm } from "../../types/BetForm"
import { BetItem } from "../../types/BetItem"
import { uniqueId } from "lodash"
import { BetNumberChip } from "./BetNumberChip"

interface GameProps {
    route: RouteProp<any, any>
}

export const Game: React.FC<GameProps> = ({ route }) => {
    const game_type = route.params?.tipo
    const game = game_list.find((item) => item.path == game_type)

    const betValueInputRef = useRef<TextInput>(null)
    const betNumberInputRef = useRef<TextInput>(null)

    const { addBet } = useCart()

    const [betNumber, setBetNumber] = useState("")
    const [bets, setBets] = useState<string[]>([])
    const [selectedPrizes, setSelectedPrizes] = useState<number[]>([1])
    const [betValue, setBetValue] = useState(0)
    const [quotes, setQuotes] = useState<QuoteResponse[]>([])

    const [focusedInput, setFocusedInput] = useState<"betNumber" | "betValue">("betNumber")

    const [submitionError, setSubmitionError] = useState("")

    const handleChangeNumber = (typed: string) => {
        const numeric = typed.match(/\d/g)
        if (numeric?.length == typed.length || !typed) {
            setBetNumber(typed)
        }
    }

    const handlePressPrize = (value: number[]) => {
        setSelectedPrizes(value)
    }

    const handleBetValueSum = (sum: number) => {
        if (betValue + sum < 0) return

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
        setBetValue(0)
        setBets([])
        setSelectedPrizes([])
    }

    const onNumberPress = (digit: number) => {
        if (!game) return

        if (focusedInput == "betValue") {
            setBetValue((value) => Number((value * 10 + digit / 100).toFixed(2)))
            betValueInputRef.current?.focus()
            return
        }

        if (focusedInput == "betNumber" && betNumber.length < game.max_chars) {
            setBetNumber((value) => value + digit.toString())
            betNumberInputRef.current?.focus()
            return
        }
    }
    const onDeletePress = () => {
        if (focusedInput == "betValue") {
            setBetValue((value) => Math.floor(value * 10) / 100)
            betValueInputRef.current?.focus()
            return
        }

        if (focusedInput == "betNumber") {
            setBetNumber((value) => value.slice(0, -1))
            betNumberInputRef.current?.focus()
            return
        }
    }
    const onConfirmPress = () => {
        if (focusedInput == "betNumber") {
            if (betNumber.length !== game?.max_chars) return
            setBets((value) => [...value.filter((item) => item !== betNumber), betNumber])
            setBetNumber("")
            betNumberInputRef.current?.focus()
            return
        }

        if (focusedInput == "betValue") {
            betValueInputRef.current?.blur()
            return
        }
    }

    const onDeleteBetNumber = (value: string) => {
        setBets((values) => values.filter((item) => item !== value))
    }

    const validateBet = () => {
        if (!game) return

        if (bets.length === 0) {
            setSubmitionError(`Preencha os números da aposta`)
            return
        }

        if (selectedPrizes.length === 0) {
            setSubmitionError("Selecione os prêmios")
            return
        }

        if (betValue < 1) {
            setSubmitionError("Valor mínimo: R$ 1,00")
            return
        }

        return true
    }

    const handleBetSubmit = () => {
        if (!validateBet() || !game) return

        const items: BetItem[] = bets.map((item) => ({ id: uniqueId(), betNumber: item, betValue, selectedPrizes, game }))

        addBet(items)
        resetGame()
        fetchQuotes()
    }

    useEffect(() => {
        setSubmitionError("")
    }, [betNumber, selectedPrizes, betValue])

    useEffect(() => {
        if (betNumber.length === game?.max_chars) {
            // betValueInputRef.current?.focus()
        }
    }, [betNumber])

    useEffect(() => {
        resetGame()
        if (game) {
            fetchQuotes()
        }
    }, [game])

    return game ? (
        <DefaultWrapper>
            <ScrollView style={[{ flex: 1 }]} contentContainerStyle={[{ paddingHorizontal: 30, gap: 15 }]}>
                <Surface style={[{ backgroundColor: colors.primary, borderRadius: 15, justifyContent: "center", alignItems: "center", padding: 10 }]}>
                    <Text style={[{ fontSize: 20, fontWeight: "bold", color: colors.background }]}>{game.label}</Text>
                </Surface>

                <BetInput
                    ref={betNumberInputRef}
                    value={betNumber}
                    onChangeText={handleChangeNumber}
                    keyboardType="number-pad"
                    maxLength={game.max_chars}
                    onFocus={() => setFocusedInput("betNumber")}
                    onSubmitEditing={onConfirmPress}
                />

                <FlatList
                    data={bets}
                    renderItem={({ item }) => <BetNumberChip value={item} onDelete={onDeleteBetNumber} />}
                    ListEmptyComponent={<View style={[{ height: 32 }]} />}
                    horizontal
                    style={[{ marginHorizontal: -30 }]}
                    contentContainerStyle={[{ paddingHorizontal: 30, gap: 15 }, ORIENTATION === "mobile" && { paddingVertical: 0 }]}
                />

                <GameText>
                    Selecione os prêmios:{" "}
                    <GameText style={[{ color: colors.success, fontWeight: "bold" }]}>
                        {selectedPrizes
                            .sort((a, b) => a - b)
                            .map((prize) => `${prize}º`)
                            .join(", ")}
                    </GameText>
                </GameText>

                <View style={[{ flexDirection: "row", gap: 15 }]}>
                    <PrizeComponent label="1º" prize_numbers={[1]} selected={selectedPrizes.length === 1} onPress={handlePressPrize} />
                    <PrizeComponent
                        label="1º ao 5º"
                        prize_numbers={[1, 2, 3, 4, 5]}
                        selected={selectedPrizes.length === 5}
                        onPress={handlePressPrize}
                    />
                </View>

                <GameText>Insira o valor da aposta:</GameText>

                <View style={[{ position: "relative" }]}>
                    <BetInput
                        ref={betValueInputRef}
                        value={currencyMask(betValue)}
                        onChangeText={handleChangeNumber}
                        small_number={ORIENTATION === "mobile"}
                        onFocus={() => setFocusedInput("betValue")}
                    />
                    <View
                        style={[
                            {
                                position: "absolute",
                                left: 10,
                                flexDirection: "row",
                                gap: 5,
                                height: "100%",
                                alignItems: "center",
                                width: "100%",
                                justifyContent: "space-between",
                                paddingRight: 20,
                            },
                        ]}
                    >
                        <Pressable
                            style={[{ position: "absolute", width: "100%", height: "100%", left: -10 }]}
                            onPress={() => betValueInputRef.current?.focus()}
                        />
                        <BetInputButton value={-0.5} onPress={handleBetValueSum} disabled={betValue === 0} />
                        <BetInputButton value={0.5} onPress={handleBetValueSum} />
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

                <BetSubmitButton onPress={handleBetSubmit} errorText={submitionError} />
            </ScrollView>
        </DefaultWrapper>
    ) : null
}
