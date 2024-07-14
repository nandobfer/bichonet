import React, { useState } from "react"
import { View } from "react-native"
import { Logo } from "../../components/Logo"
import { IconButton } from "react-native-paper"
import { colors } from "../../style/colors"
import { ORIENTATION } from "../../tools/orientation"
import { useUser } from "../../hooks/useUser"
import { useDrawer } from "../../hooks/useDrawer"
import { useNavigation } from "@react-navigation/native"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    const navigation = useNavigation()
    const { toggleDrawer } = useDrawer()

    return (
        <View
            style={[
                { flexDirection: "row", padding: 20, alignItems: "center", justifyContent: "space-between" },
                ORIENTATION == "desktop" && { padding: 20, paddingVertical: 50 },
            ]}
        >
            <IconButton
                onPress={() => navigation.goBack()}
                icon={"chevron-left-circle"}
                iconColor={colors.secondary}
                size={ORIENTATION == "desktop" ? 50 : 35}
                style={[{ margin: 0 }]}
            />
            <Logo size={ORIENTATION == "desktop" ? 125 : 75} />
            <IconButton
                onPress={() => toggleDrawer()}
                icon={"menu"}
                iconColor={colors.secondary}
                size={ORIENTATION == "desktop" ? 50 : 35}
                style={[{ margin: 0 }]}
            />
        </View>
    )
}
