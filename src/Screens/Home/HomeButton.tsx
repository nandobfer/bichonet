import React from "react"
import { View } from "react-native"
import { Button, ButtonProps } from "react-native-paper"
import { colors } from "../../style/colors"
import { ORIENTATION } from "../../tools/orientation"
import { scale } from "../../tools/scale"

export const HomeButton: React.FC<ButtonProps> = (props) => {
    return (
        <Button
            mode="contained"
            buttonColor={ORIENTATION == "mobile" ? colors.secondary : colors.background}
            textColor={ORIENTATION == "mobile" ? colors.background : colors.secondary}
            labelStyle={[{ fontSize: 22, fontWeight: "bold" }, ORIENTATION === "desktop" && { fontSize: scale(22) }]}
            contentStyle={[{ paddingVertical: 5 }, ORIENTATION === "desktop" && { paddingVertical: scale(5) }]}
            {...props}
            style={[{ flex: 1, borderRadius: 100 }, props.style]}
        />
    )
}
