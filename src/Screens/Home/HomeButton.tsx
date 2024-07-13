import React from "react"
import { View } from "react-native"
import { Button, ButtonProps } from "react-native-paper"
import { colors } from "../../style/colors"
import { ORIENTATION } from "../../tools/orientation"

export const HomeButton: React.FC<ButtonProps> = (props) => {
    return (
        <Button
            mode="contained"
            style={{ flex: 1, borderRadius: 100 }}
            {...props}
            buttonColor={ORIENTATION == "mobile" ? colors.secondary : colors.background}
            textColor={ORIENTATION == "mobile" ? colors.background : colors.secondary}
            labelStyle={[{ fontSize: 22, fontWeight: "bold" }]}
            contentStyle={[{ paddingVertical: 5 }]}
        />
    )
}
