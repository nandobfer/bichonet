import React from "react"
import { TextInput, View } from "react-native"
import { FormText, FormTextProps } from "../../components/FormText"
import { colors } from "../../style/colors"
import { ORIENTATION } from "../../tools/orientation"

interface SignupInputProps {}

export const SignupInput = React.forwardRef<React.ElementRef<typeof TextInput>, FormTextProps>((props, ref) => {
    return (
        <FormText
            ref={ref}
            transparent={false}
            color={ORIENTATION == "desktop" ? colors.background : colors.secondary}
            labelSize={20}
            style={{ backgroundColor: colors.secondary }}
            outlineStyle={{ borderRadius: 100 }}
            labelBold
            {...props}
        />
    )
})
