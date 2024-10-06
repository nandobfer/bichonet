import React from "react"
import { TextStyle, TouchableOpacity, View } from "react-native"
import { BetItem } from "../../types/BetItem"
import { Icon, Text } from "react-native-paper"
import { GameText } from "../../Screens/Game/GameText"
import { colors } from "../../style/colors"
import { currencyMask } from "../../tools/currencyMask"
import { useCart } from "../../hooks/useCart"
import { FormikErrors } from "formik"
import { BetItemForm } from "../../types/BetForm"
import { scale } from "../../tools/scale"

interface BetComponentProps {
    id?: string
    label: string
    value: number
    bold?: boolean
    error?: string | string[] | FormikErrors<BetItemForm>[]
}

export const BetComponent: React.FC<BetComponentProps> = ({ label, value, bold, id, error }) => {
    const { removeBet } = useCart()

    const text_style: TextStyle = { fontFamily: "Courier", fontSize: scale(14), color: "#000", flex: 1 }

    return (
        <View
            style={[
                {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: scale(5),
                    borderBottomWidth: scale(1),
                    borderColor: "#eee", // Light separator between items
                },
            ]}
        >
            <GameText style={[text_style, bold && { fontWeight: "bold" }, !!error && { color: colors.error }]}>{label}</GameText>
            <View
                style={[
                    { borderBottomColor: colors.secondary, borderBottomWidth: 2, borderStyle: "dashed" },
                    !!error && { borderBottomColor: colors.error },
                ]}
            />
            <GameText style={[text_style, bold && { fontWeight: "bold" }, !!error && { color: colors.error }]}>{currencyMask(value)}</GameText>

            <TouchableOpacity onPress={!!id ? () => removeBet(id) : undefined}>
                <GameText style={[text_style, bold && { fontWeight: "bold" }, !!error && { color: colors.error }]}>{id ? "X" : " "}</GameText>
            </TouchableOpacity>
        </View>
    )
}
