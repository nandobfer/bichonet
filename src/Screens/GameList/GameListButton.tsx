import React from "react"
import { View } from "react-native"
import { Button, ButtonProps, Text, TouchableRipple } from "react-native-paper"
import { colors } from "../../style/colors"
import { ORIENTATION } from "../../tools/orientation"
import { useLinkTo } from "@react-navigation/native"
import { GameOption } from "../../types/GameOption"

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
                    padding: 10,
                    gap: 5,
                },
                !option.label && { opacity: 0, pointerEvents: "none" },
            ]}
        >
            <>
                <Text
                    style={[
                        { fontWeight: "bold", fontSize: 16, textAlign: "center", color: colors.background },
                        ORIENTATION == "desktop" && { fontSize: 22 },
                    ]}
                    numberOfLines={2}
                >
                    {option.label}
                </Text>
                <Text style={[{ fontSize: 10, color: colors.background, fontWeight: "bold" }, ORIENTATION == "desktop" && { fontSize: 16 }]}>
                    {option.secondary_label}
                </Text>
            </>
        </TouchableRipple>
    )
}
