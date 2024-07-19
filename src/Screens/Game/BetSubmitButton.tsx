import React, { useEffect, useRef } from "react"
import { Animated, View } from "react-native"
import { Text, TouchableRipple } from "react-native-paper"
import { colors } from "../../style/colors"

interface BetSubmitButtonProps {
    onPress: () => void
    errorText?: string
}

export const BetSubmitButton: React.FC<BetSubmitButtonProps> = ({ onPress, errorText }) => {
    const backgroundColorAnim = useRef(new Animated.Value(0)).current
    const backgroundColor = backgroundColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.success, colors.error], // Example colors
    })

    useEffect(() => {
        Animated.timing(backgroundColorAnim, {
            toValue: errorText ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start()
    }, [errorText])

    return (
        <TouchableRipple borderless style={[{ borderRadius: 15 }]} onPress={onPress}>
            <Animated.View style={[{ backgroundColor, borderRadius: 15, justifyContent: "center", alignItems: "center", padding: 10 }]}>
                <Text
                    style={[{ fontWeight: "bold", fontSize: 30, color: errorText ? colors.secondary : colors.background, textAlign: "center" }]}
                    selectable={false}
                >
                    {errorText || "Apostar"}
                </Text>
            </Animated.View>
        </TouchableRipple>
    )
}
