import React from "react"
import { View } from "react-native"
import { Icon, Surface, Text, TouchableRipple } from "react-native-paper"
import { colors } from "../../style/colors"
import { MOBILE, ORIENTATION, DESKTOP } from "../../tools/orientation"
import { scale } from "../../tools/scale"

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
                        padding: scale(10),
                        width: 75,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: button_border,
                    },
                    DESKTOP && { width: scale(120), height: scale(65) },
                    fat && { width: "100%" },
                ]}
            >
                {value !== undefined ? (
                    <Text
                        style={[{ fontSize: scale(40), fontWeight: "bold", color: colors.background }, MOBILE && { fontSize: 35 }]}
                        selectable={false}
                    >
                        {value}
                    </Text>
                ) : (
                    <Icon source={icon} size={scale(40)} color={icon_color} />
                )}
            </Surface>
        </TouchableRipple>
    )
}
