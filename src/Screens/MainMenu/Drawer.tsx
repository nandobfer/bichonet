import React, { useEffect, useRef } from "react"
import { Animated, Pressable } from "react-native"
import { useDrawer } from "../../hooks/useDrawer"
import { Surface } from "react-native-paper"
import { colors } from "../../style/colors"
import { ORIENTATION } from "../../tools/orientation"
import { CartComponent } from "../../components/Cart/CartComponent"

interface DrawerProps {}

export const Drawer: React.FC<DrawerProps> = ({}) => {
    const opacity = useRef(new Animated.Value(0)).current

    const { width, translateX, toggleDrawer, menuDrawer } = useDrawer()

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: menuDrawer ? 0.5 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start()
    }, [menuDrawer])

    return (
        <>
            <Animated.View
                pointerEvents={menuDrawer ? "auto" : "none"} // This ensures the Pressable can be interacted with when visible
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    right: 0,
                    backgroundColor: "black",
                    opacity: opacity, // Use the animated opacity value here
                }}
            >
                <Pressable style={{ flex: 1 }} onPress={toggleDrawer} />
            </Animated.View>
            <Animated.View
                style={{
                    width: width * (ORIENTATION == "desktop" ? 0.25 : 0.75),
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    transform: [{ translateX }],
                    flexDirection: "row-reverse",
                }}
            >
                <Surface elevation={5} style={[{ flex: 1, backgroundColor: colors.background, padding: 30 }]}>
                    <CartComponent />
                </Surface>
            </Animated.View>
        </>
    )
}
