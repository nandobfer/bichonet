import React from "react"
import { View } from "react-native"
import { Button, Surface } from "react-native-paper"
import { colors } from "../../style/colors"

interface BetInputButtonProps {
    onPress: (value: number) => void
    value: number
    disabled?: boolean
}

export const BetInputButton: React.FC<BetInputButtonProps> = ({ onPress, value, disabled }) => {
    const is_minus = value < 0
    return (
        <Surface style={[{ borderRadius: 5, backgroundColor: "transparent" }]} elevation={2}>
            <Button
                mode="contained"
                buttonColor={is_minus ? colors.error : colors.success}
                textColor={colors.background}
                labelStyle={{ fontWeight: "bold", fontSize: 30 }}
                style={[{ width: 50, borderRadius: 5 }]}
                onPress={() => onPress(value)}
                disabled={disabled}
            >
                {value > 0 ? "+" : "-"}
            </Button>
        </Surface>
    )
}
