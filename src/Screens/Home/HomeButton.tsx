import React from "react"
import { View } from "react-native"
import { Button, ButtonProps } from "react-native-paper"
import { colors } from "../../style/colors"

export const HomeButton: React.FC<ButtonProps> = (props) => {
    return (
        <Button
            mode="contained"
            style={{ flex: 1, borderRadius: 100 }}
            {...props}
            buttonColor={colors.secondary}
            textColor={colors.background}
            labelStyle={[{ fontSize: 22, fontWeight: "bold" }]}
            contentStyle={[{ paddingVertical: 5 }]}
        />
    )
}
