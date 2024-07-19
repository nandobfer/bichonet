import React from "react"
import { View } from "react-native"
import { RadioButton, Surface, Text, TouchableRipple } from "react-native-paper"
import { colors } from "../../style/colors"
import { ORIENTATION } from "../../tools/orientation"

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
                elevation={3}
                style={[
                    {
                        backgroundColor: colors.secondary,
                        alignItems: "center",
                        padding: 20,
                        paddingTop: 25,
                        borderRadius: 10,
                        borderBottomWidth: 5,
                        borderColor: colors.primary,
                    },
                    ORIENTATION == "desktop" && { padding: 30, borderBottomWidth: 10 },
                    selected && { backgroundColor: colors.success, borderBottomColor: colors.success },
                ]}
            >
                <Text style={[{ color: colors.background, fontSize: 30 }, ORIENTATION == "desktop" && { fontSize: 40 }]}>{prize_number}</Text>
            </Surface>
        </TouchableRipple>
    )
}
