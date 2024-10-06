import React from "react"
import { FlatList, View } from "react-native"
import { BetNumberChip } from "./BetNumberChip"
import { scale } from "../../tools/scale"
import { DESKTOP, MOBILE } from "../../tools/orientation"

interface BetsFlatlistProps {
    bets: string[]
    setBets: React.Dispatch<React.SetStateAction<string[]>>
}

export const BetsFlatlist: React.FC<BetsFlatlistProps> = ({ bets, setBets }) => {
    const onDeleteBetNumber = (value: string) => {
        setBets((values) => values.filter((item) => item !== value))
    }

    return (
        <FlatList
            data={bets}
            renderItem={({ item }) => <BetNumberChip value={item} onDelete={onDeleteBetNumber} />}
            ListEmptyComponent={<View style={[{ height: 32 }]} />}
            horizontal
            style={[{ marginHorizontal: scale(-30) }, DESKTOP && { marginHorizontal: scale(-20) }]}
            contentContainerStyle={[
                { paddingHorizontal: scale(30), gap: scale(15) },
                MOBILE && { paddingVertical: 0 },
                DESKTOP && { paddingHorizontal: scale(20) },
            ]}
        />
    )
}
