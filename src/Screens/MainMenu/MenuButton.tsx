import React from "react"
import { View } from "react-native"
import { Button, ButtonProps } from "react-native-paper"
import { colors } from "../../style/colors"
import { scale } from "../../tools/scale"

interface MenuButtonProps extends ButtonProps {}

export const MenuButton: React.FC<MenuButtonProps> = (props) => {
    return (
        <Button
            mode="contained"
            textColor={colors.background}
            labelStyle={[{ fontWeight: "bold", fontSize: scale(20) }]}
            {...props}
            style={[{}, props.style]}
        />
    )
}
