import React from "react"
import { FlatList, View } from "react-native"
import { Text } from "react-native-paper"
import { BetKeyboardButton } from "./BetKeyboardButton"
import { colors } from "../../style/colors"

interface BetKeyboardProps {
    onNumberPress: (number: number) => void
    onDeletePress: () => void
    onConfirmPress: () => void
}

export const BetKeyboard: React.FC<BetKeyboardProps> = ({ onNumberPress, onDeletePress, onConfirmPress }) => {
    const keys = new Array(9).fill(1).map((_, index) => index + 1)

    const keyboard_gap = 15

    return (
        <View style={[{ flexDirection: "row", gap: keyboard_gap, alignSelf: "center" }]}>
            <View>
                <FlatList
                    numColumns={3}
                    data={keys}
                    renderItem={({ item }) => <BetKeyboardButton value={item} onPress={onNumberPress} />}
                    style={[{}]}
                    contentContainerStyle={[{ gap: keyboard_gap }]}
                    columnWrapperStyle={[{ gap: keyboard_gap }]}
                />
            </View>
            <View style={[{ gap: keyboard_gap }]}>
                <BetKeyboardButton onPress={onDeletePress} icon="alpha-x-circle" icon_color={colors.error} />
                <BetKeyboardButton value={0} onPress={onNumberPress} />
                <BetKeyboardButton onPress={onConfirmPress} icon="check-circle" icon_color={colors.success} />
            </View>
        </View>
    )
}
