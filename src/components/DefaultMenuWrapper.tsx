import React from "react"
import { View } from "react-native"

interface DefaultMenuWrapperProps {
    children?: React.ReactNode
}

export const DefaultMenuWrapper: React.FC<DefaultMenuWrapperProps> = ({ children }) => {
    return <View style={[{ paddingHorizontal: 30, gap: 20, flex: 1 }]}>{children}</View>
}
