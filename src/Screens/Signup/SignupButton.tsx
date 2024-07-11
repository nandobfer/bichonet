import React from "react"
import { View } from "react-native"
import { Button, ButtonProps } from "react-native-paper"
import { colors } from "../../style/colors"

interface SignupButtonProps {}

export const SignupButton: React.FC<ButtonProps> = (props) => {
    return (
        <Button
            mode="contained"
            {...props}
            style={{ flex: 1, borderRadius: 100 }}
            labelStyle={[{ fontSize: 20, fontWeight: "bold" }]}
            textColor={colors.background}
            contentStyle={[{ paddingVertical: 5 }]}
        />
    )
}
