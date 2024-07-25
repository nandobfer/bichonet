import React from "react"
import { View } from "react-native"
import { RadioButton, Surface, Text, TouchableRipple } from "react-native-paper"
import { colors } from "../../style/colors"
import { ORIENTATION } from "../../tools/orientation"

interface PrizeComponentProps {
    prize_numbers: number[]
    label: string
    selected: boolean
    onPress: (selected_numbers: number[]) => void
}

export const PrizeComponent: React.FC<PrizeComponentProps> = ({ prize_numbers, selected, onPress, label }) => {
    return (
        <TouchableRipple onPress={() => onPress(prize_numbers)} borderless style={[{ borderRadius: 10, flex: 1 }]}>
            <Surface
                elevation={3}
                style={[
                    {
                        flex: 1,
                        backgroundColor: colors.secondary,
                        alignItems: "center",
                        padding: 13,
                        borderRadius: 10,
                        borderBottomWidth: 3,
                        borderColor: colors.primary,
                    },
                    ORIENTATION == "desktop" && { padding: 15, borderBottomWidth: 5 },
                    selected && { backgroundColor: colors.success, borderBottomColor: colors.success },
                ]}
            >
                <Text
                    style={[{ color: colors.background, fontSize: 26, fontWeight: "bold" }, ORIENTATION == "desktop" && { fontSize: 30 }]}
                    selectable={false}
                >
                    {label}
                </Text>
            </Surface>
        </TouchableRipple>
    )
}
