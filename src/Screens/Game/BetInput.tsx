import React from "react"
import { TextInput as OriginalInput } from "react-native"
import { TextInput, TextInputProps } from "react-native-paper"
import { colors } from "../../style/colors"
import { scale } from "../../tools/scale"

interface BetInputProps extends TextInputProps {
    small_number?: boolean
}

export const BetInput = React.forwardRef<React.ElementRef<typeof OriginalInput>, BetInputProps>((props, ref) => {
    return (
        <TextInput
            ref={ref}
            mode="outlined"
            showSoftInputOnFocus={false}
            {...props}
            outlineStyle={[{ borderRadius: 15 }, props.outlineStyle]}
            contentStyle={[
                { textAlign: "center", fontSize: scale(35), fontWeight: "bold", color: colors.background },
                props.small_number && { fontSize: scale(28) },
                props.contentStyle,
            ]}
            style={[props.style]}
        />
    )
})
