import React from "react"
import { View } from "react-native"
import { scale } from "../tools/scale"

interface DefaultMenuWrapperProps {
    children?: React.ReactNode
}

export const DefaultMenuWrapper: React.FC<DefaultMenuWrapperProps> = ({ children }) => {
    return <View style={[{ paddingHorizontal: scale(30), gap: scale(20), flex: 1 }]}>{children}</View>
}
