import React from "react"
import { TextInput, TextInputProps } from "react-native-paper"
import { colors } from "../../style/colors"

interface BetInputProps extends TextInputProps {
    small_number?: boolean
}

export const BetInput: React.FC<BetInputProps> = (props) => {
    return (
        <TextInput
            mode="outlined"
            {...props}
            outlineStyle={[{ borderRadius: 15 }, props.outlineStyle]}
            contentStyle={[
                { textAlign: "center", fontSize: 40, fontWeight: "bold", color: colors.background },
                props.small_number && { fontSize: 30 },
                props.contentStyle,
            ]}
            style={[{ padding: 10 }, props.style]}
        />
    )
}
