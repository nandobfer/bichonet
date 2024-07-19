import React from "react"
import { View } from "react-native"
import { Icon, Surface, Text, TouchableRipple } from "react-native-paper"
import { colors } from "../../style/colors"

interface BetKeyboardButtonProps {
    value?: number
    icon?: string
    icon_color?: string
    onPress: Function
}

export const BetKeyboardButton: React.FC<BetKeyboardButtonProps> = ({ value, onPress, icon, icon_color }) => {
    const button_border = 10

    return (
        <TouchableRipple onPress={() => onPress(value)} borderless style={[{ borderRadius: button_border }]}>
            <Surface
                elevation={2}
                style={[{ padding: 10, width: 60, aspectRatio: 1, justifyContent: "center", alignItems: "center", borderRadius: button_border }]}
            >
                {value !== undefined ? (
                    <Text style={[{ fontSize: 40, fontWeight: "bold", color: colors.background }]} selectable={false}>
                        {value}
                    </Text>
                ) : (
                    <Icon source={icon} size={40} color={icon_color} />
                )}
            </Surface>
        </TouchableRipple>
    )
}
