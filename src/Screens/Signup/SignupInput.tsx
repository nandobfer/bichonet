import React from "react"
import { View } from "react-native"
import { FormText, FormTextProps } from "../../components/FormText"
import { colors } from "../../style/colors"

interface SignupInputProps {}

export const SignupInput: React.FC<FormTextProps> = (props) => {
    return (
        <FormText
            {...props}
            transparent={false}
            color={colors.secondary}
            labelSize={20}
            style={{ backgroundColor: colors.secondary }}
            outlineStyle={{ borderRadius: 100 }}
            labelBold
            labelCentered
        />
    )
}
