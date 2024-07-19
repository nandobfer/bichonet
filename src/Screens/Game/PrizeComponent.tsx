import React from "react"
import { View } from "react-native"
import { RadioButton, Surface, Text, TouchableRipple } from "react-native-paper"
import { colors } from "../../style/colors"
import { ORIENTATION } from "../../tools/orientation"

interface PrizeComponentProps {
    prize_number: number
    selected: boolean
    onPress: (selected_number: number) => void
}

export const PrizeComponent: React.FC<PrizeComponentProps> = ({ prize_number, selected, onPress }) => {
    return (
        <TouchableRipple onPress={() => onPress(prize_number)} borderless style={[{ borderRadius: 10 }]}>
            <Surface
                elevation={3}
                style={[
                    {
                        backgroundColor: colors.secondary,
                        alignItems: "center",
                        padding: 13,
                        borderRadius: 10,
                        borderBottomWidth: 3,
                        borderColor: colors.primary,
                    },
                    ORIENTATION == "desktop" && { padding: 20, borderBottomWidth: 5 },
                    selected && { backgroundColor: colors.success, borderBottomColor: colors.success },
                ]}
            >
                <Text
                    style={[{ color: colors.background, fontSize: 26, fontWeight: "bold" }, ORIENTATION == "desktop" && { fontSize: 30 }]}
                    selectable={false}
                >
                    {prize_number}º
                </Text>
            </Surface>
        </TouchableRipple>
    )
}
