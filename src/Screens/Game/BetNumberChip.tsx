import React from "react"
import { View } from "react-native"
import { Chip } from "react-native-paper"
import { colors } from "../../style/colors"

interface BetNumberChipProps {
    value: string
    onDelete: (value: string) => void
}

export const BetNumberChip: React.FC<BetNumberChipProps> = ({ value, onDelete }) => {
    return (
        <Chip
            onClose={() => onDelete(value)}
            closeIcon={"close-circle"}
            elevated
            style={[{ backgroundColor: colors.primary }]}
            selected
            showSelectedCheck={false}
            selectedColor={colors.background}
        >
            {value}
        </Chip>
    )
}
