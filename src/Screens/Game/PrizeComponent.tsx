import React from "react"
import { View } from "react-native"
import { Surface, Text, TouchableRipple } from "react-native-paper"
import { colors } from "../../style/colors"

interface PrizeComponentProps {
    prize_number: number
    selected: boolean
    onPress: (selected_number: number) => void
    value: number
}

export const PrizeComponent: React.FC<PrizeComponentProps> = ({ prize_number, selected, onPress, value }) => {
    return (
        <TouchableRipple onPress={() => onPress(value)} borderless style={[{ borderRadius: 10 }]}>
            <Surface
                style={[
                    { backgroundColor: colors.primary, alignItems: "center", padding: 10, borderRadius: 10 },
                    selected && { borderBottomColor: colors.success, borderBottomWidth: 5 },
                ]}
            >
                <Text style={[{ color: colors.background, fontSize: 22 }]}>{prize_number}</Text>
            </Surface>
        </TouchableRipple>
    )
}
