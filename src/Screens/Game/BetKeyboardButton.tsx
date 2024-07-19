import React from "react"
import { View } from "react-native"
import { Icon, Surface, Text, TouchableRipple } from "react-native-paper"
import { colors } from "../../style/colors"
import { ORIENTATION } from "../../tools/orientation"

interface BetKeyboardButtonProps {
    value?: number
    icon?: string
    icon_color?: string
    onPress: Function
    fat?: boolean
}

export const BetKeyboardButton: React.FC<BetKeyboardButtonProps> = ({ value, onPress, icon, icon_color, fat }) => {
    const button_border = 10

    return (
        <TouchableRipple onPress={() => onPress(value)} borderless style={[{ borderRadius: button_border }]}>
            <Surface
                elevation={2}
                style={[
                    {
                        padding: 10,
                        width: 75,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: button_border,
                    },
                    ORIENTATION == "desktop" && { width: 120, height: 65 },
                    fat && { width: "100%" },
                ]}
            >
                {value !== undefined ? (
                    <Text
                        style={[{ fontSize: 40, fontWeight: "bold", color: colors.background }, ORIENTATION == "mobile" && { fontSize: 35 }]}
                        selectable={false}
                    >
                        {value}
                    </Text>
                ) : (
                    <Icon source={icon} size={40} color={icon_color} />
                )}
            </Surface>
        </TouchableRipple>
    )
}
