import React from "react"
import { TouchableOpacity, View } from "react-native"
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

    return (
        <View style={[{ flex: 1, flexDirection: "row", gap: scale(10), alignItems: "flex-end" }]}>
            <GameText style={[bold && { fontWeight: "bold" }, !!error && { color: colors.error }]}>{label}</GameText>
            <View
                style={[
                    { flex: 1, borderBottomColor: colors.secondary, borderBottomWidth: 2, borderStyle: "dashed" },
                    !!error && { borderBottomColor: colors.error },
                ]}
            />
            <GameText style={[bold && { fontWeight: "bold" }, !!error && { color: colors.error }]}>{currencyMask(value)}</GameText>
            {!!id && (
                <TouchableOpacity onPress={() => removeBet(id)}>
                    <Icon source={"delete-forever"} size={scale(20)} color={colors.error} />
                </TouchableOpacity>
            )}
        </View>
    )
}
