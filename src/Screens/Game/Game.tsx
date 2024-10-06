import { RouteProp } from "@react-navigation/native"
import React, { useEffect, useRef, useState } from "react"
import { Animated, FlatList, Pressable, ScrollView, TextInput, View } from "react-native"
import { ActivityIndicator, Button, Surface, Text, TouchableRipple } from "react-native-paper"
import { DefaultWrapper } from "../../components/DefaultWrapper"
import { game_list, isBicho } from "../GameList/game_list"
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
import { uniqueId, values } from "lodash"
import { BetNumberChip } from "./BetNumberChip"
import { BichoModal } from "./BichoModal/BichoModal"
import { scale } from "../../tools/scale"
import { mask as masked } from "react-native-mask-text"
import { unmaskCurrency } from "../../tools/unmaskCurrency"
import unmask from "../../tools/unmask"

interface GameProps {
    route: RouteProp<any, any>
}

export const Game: React.FC<GameProps> = ({ route }) => {
    const game_type = route.params?.tipo
    const game = game_list.find((item) => item.path == game_type)
    const max_length = game?.mask.length || 0

    const is_bicho = isBicho(game)

    const betValueInputRef = useRef<TextInput>(null)
    const betNumberInputRef = useRef<TextInput>(null)

    const { addBet } = useCart()

    const [betNumber, setBetNumber] = useState("")
    const [bets, setBets] = useState<string[]>([])
    const [selectedPrizes, setSelectedPrizes] = useState<number[]>([1])
    const [betValue, setBetValue] = useState(0)
    const [quotes, setQuotes] = useState<QuoteResponse[]>([])

    const [focusedInput, setFocusedInput] = useState<"betNumber" | "betValue">(is_bicho ? "betValue" : "betNumber")

    const [submitionError, setSubmitionError] = useState("")
    const [bichoModal, setBichoModal] = useState(false)

    const handleChangeNumber = (typed: string | number) => {
        if (!game) return

        if (typeof typed === "number") {
            setBetNumber((value) => masked(value + typed.toString(), game.mask))
        } else {
            setBetNumber(masked(typed, game.mask))
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

    const handleBetValueChange = (typed: string) => {
        // Remove any non-digit characters
        const digits = typed.replace(/\D/g, "")

        // Convert the digits to a number and divide by 100 to get the currency value
        const value = digits ? Number(digits) / 100 : 0

        // Update the betValue state
        setBetValue(value)
    }

    // const onNumberPress = (digit: number) => {
    //     if (!game) return

    //     if (focusedInput == "betValue") {
    //         handleBetValueChange(digit)
    //         betValueInputRef.current?.focus()
    //         return
    //     }

    //     if (focusedInput == "betNumber" && betNumber.length < max_length) {
    //         handleChangeNumber(digit)
    //         betNumberInputRef.current?.focus()
    //         return
    //     }
    // }
    // const onDeletePress = () => {
    //     if (focusedInput == "betValue") {
    //         setBetValue((value) => Math.floor(value * 10) / 100)
    //         betValueInputRef.current?.focus()
    //         return
    //     }

    //     if (focusedInput == "betNumber") {
    //         setBetNumber((value) => {
    //             const last_char = value[value.length - 1]
    //             return value.slice(0, isNaN(Number(last_char)) ? -2 : -1)
    //         })
    //         betNumberInputRef.current?.focus()
    //         return
    //     }
    // }

    const onConfirmPress = () => {
        if (focusedInput == "betNumber") {
            if (betNumber.length !== max_length) return
            setBets((value) => [...value.filter((item) => item !== betNumber), betNumber])
            setBetNumber("")
            setTimeout(() => betNumberInputRef.current?.focus(), 100)
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

    const handleBichoPress = (value: string) => {
        if (bets.includes(value)) {
            setBets((bets) => bets.filter((item) => item !== value))
        } else {
            setBets((bets) => [...bets, value])
        }
    }

    useEffect(() => {
        setSubmitionError("")
    }, [betNumber, selectedPrizes, betValue])

    useEffect(() => {
        console.log(betNumber)
        if (betNumber.length === max_length) {
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
            <ScrollView style={[{ flex: 1 }]} contentContainerStyle={[{ paddingHorizontal: scale(30), gap: scale(15) }]}>
                <Surface
                    style={[
                        { backgroundColor: colors.primary, borderRadius: 15, justifyContent: "center", alignItems: "center", padding: scale(10) },
                    ]}
                >
                    <Text style={[{ fontSize: scale(20), fontWeight: "bold", color: colors.background }]}>{game.label}</Text>
                </Surface>

                <BetInput
                    ref={betNumberInputRef}
                    value={betNumber}
                    maxLength={max_length}
                    mask={game.mask}
                    onChangeText={handleChangeNumber}
                    keyboardType="number-pad"
                    onFocus={() => (is_bicho ? setBichoModal(true) : setFocusedInput("betNumber"))}
                    onSubmitEditing={onConfirmPress}
                    returnKeyType="done"
                    placeholder={is_bicho ? "Selecionar bicho" : undefined}
                    showSoftInputOnFocus={!is_bicho}
                />

                <FlatList
                    data={bets}
                    renderItem={({ item }) => <BetNumberChip value={item} onDelete={onDeleteBetNumber} />}
                    ListEmptyComponent={<View style={[{ height: 32 }]} />}
                    horizontal
                    style={[{ marginHorizontal: scale(-30) }]}
                    contentContainerStyle={[{ paddingHorizontal: scale(30), gap: scale(15) }, ORIENTATION === "mobile" && { paddingVertical: 0 }]}
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

                <View style={[{ flexDirection: "row", gap: scale(15) }]}>
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
                        keyboardType="number-pad"
                        onChangeText={handleBetValueChange}
                        small_number={ORIENTATION === "mobile"}
                        onFocus={() => setFocusedInput("betValue")}
                    />
                    <View
                        style={[
                            {
                                position: "absolute",
                                left: 10,
                                flexDirection: "row",
                                gap: scale(5),
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
                            contentContainerStyle={[{ gap: scale(8), paddingVertical: scale(5) }]}
                            ItemSeparatorComponent={() => <GameText style={{ marginLeft: scale(8) }}>e</GameText>}
                        />
                    </GameText>
                ) : (
                    <ActivityIndicator color={colors.success} />
                )}

                {/* <BetKeyboard onNumberPress={onNumberPress} onConfirmPress={onConfirmPress} onDeletePress={onDeletePress} /> */}

                <BetSubmitButton onPress={handleBetSubmit} errorText={submitionError} />
            </ScrollView>
            <BichoModal open={bichoModal} onClose={() => setBichoModal(false)} onBichoPress={handleBichoPress} selected_values={bets} />
        </DefaultWrapper>
    ) : null
}
