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
    const [selectedPrizes, setSelectedPrizes] = useState<number[]>([])
    const [betValue, setBetValue] = useState(0)
    const [quotes, setQuotes] = useState<QuoteResponse[]>([])

    const [focusedInput, setFocusedInput] = useState<"betNumber" | "betValue">("betNumber")

    const [submitionError, setSubmitionError] = useState("")

    const handleChangeValue = (typed: string) => {
        const numeric = typed.match(/\d/g)
        if (numeric?.length == typed.length || !typed) {
            setBetNumber(typed)
        }
    }

    const handlePressPrize = (pressed_number: number) => {
        if (selectedPrizes.includes(pressed_number)) {
            setSelectedPrizes((value) => value.filter((item) => item !== pressed_number))
        } else {
            setSelectedPrizes((value) => [...value, pressed_number])
        }
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
            betValueInputRef.current?.focus()
            return
        }

        if (focusedInput == "betValue") {
            betValueInputRef.current?.blur()
            return
        }
    }

    const validateBet = () => {
        if (!game) return

        if (betNumber.length !== game.max_chars) {
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

        const bet: BetItem = {
            betNumber,
            betValue,
            selectedPrizes,
            game,
        }

        addBet(bet)
    }

    useEffect(() => {
        setSubmitionError("")
    }, [betNumber, selectedPrizes, betValue])

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
                    onChangeText={handleChangeValue}
                    keyboardType="number-pad"
                    maxLength={game.max_chars}
                    onFocus={() => setFocusedInput("betNumber")}
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

                <FlatList
                    horizontal
                    data={new Array(game.prizes).fill(1).map((_, index) => index + 1)}
                    renderItem={({ item }) => (
                        <PrizeComponent prize_number={item} selected={selectedPrizes.includes(item)} onPress={handlePressPrize} />
                    )}
                    contentContainerStyle={[{ gap: 5, flex: 1, justifyContent: "space-between" }]}
                />

                <GameText>Insira o valor da aposta:</GameText>

                <View style={[{ position: "relative" }]}>
                    <BetInput
                        ref={betValueInputRef}
                        value={currencyMask(betValue)}
                        onChangeText={handleChangeValue}
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
                        <BetInputButton value={-1} onPress={handleBetValueSum} disabled={betValue === 0} />
                        <BetInputButton value={1} onPress={handleBetValueSum} />
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
