import React from "react"
import { View } from "react-native"
import { Logo } from "../../components/Logo"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    return (
        <View style={[{ padding: 20, alignItems: "center", position: "relative" }]}>
            <Logo size={100} />
        </View>
    )
}
