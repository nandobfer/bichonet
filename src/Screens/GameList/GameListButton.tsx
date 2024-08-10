import React from "react"
import { View } from "react-native"
import { Button, ButtonProps, Text, TouchableRipple } from "react-native-paper"
import { colors } from "../../style/colors"
import { ORIENTATION, DESKTOP } from "../../tools/orientation"
import { useLinkTo } from "@react-navigation/native"
import { GameOption } from "../../types/GameOption"
import { scale } from "../../tools/scale"

interface GameListButtonProps {
    option: GameOption
}

export const GameListButton: React.FC<GameListButtonProps> = ({ option }) => {
    const linkTo = useLinkTo()

    return (
        <TouchableRipple
            borderless
            onPress={() => linkTo(`/jogo?tipo=${option.path}`)}
            style={[
                {
                    borderRadius: 10,
                    backgroundColor: colors.primary,
                    flex: 1,
                    aspectRatio: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: scale(10),
                    gap: scale(5),
                },
                !option.label && { opacity: 0, pointerEvents: "none" },
            ]}
        >
            <>
                <Text
                    selectable={false}
                    style={[{ fontWeight: "bold", fontSize: 16, textAlign: "center", color: colors.background }, DESKTOP && { fontSize: scale(22) }]}
                    numberOfLines={2}
                >
                    {option.label}
                </Text>
                <Text style={[{ fontSize: 10, color: colors.background, fontWeight: "bold" }, DESKTOP && { fontSize: scale(16) }]}>
                    {option.secondary_label}
                </Text>
            </>
        </TouchableRipple>
    )
}
