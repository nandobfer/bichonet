import React, { useState } from "react"
import { View } from "react-native"
import { Logo } from "../../components/Logo"
import { IconButton } from "react-native-paper"
import { colors } from "../../style/colors"
import { ORIENTATION } from "../../tools/orientation"
import { useDrawer } from "../../hooks/useDrawer"
import { scale } from "../../tools/scale"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    const { toggleDrawer } = useDrawer()

    const onBackPress = () => {
        history.back()
    }

    return (
        <View
            style={[
                { flexDirection: "row", padding: 20, alignItems: "center", justifyContent: "space-between" },
                ORIENTATION == "desktop" && { padding: scale(20), paddingVertical: scale(20) },
            ]}
        >
            <IconButton
                onPress={() => onBackPress()}
                icon={"chevron-left-circle"}
                iconColor={colors.secondary}
                size={ORIENTATION == "desktop" ? scale(50) : 35}
                style={[{ margin: 0 }]}
            />
            <Logo size={ORIENTATION == "desktop" ? scale(125) : 75} />
            <IconButton
                onPress={() => toggleDrawer()}
                icon={"cart"}
                iconColor={colors.secondary}
                size={ORIENTATION == "desktop" ? scale(50) : 35}
                style={[{ margin: 0 }]}
            />
        </View>
    )
}
