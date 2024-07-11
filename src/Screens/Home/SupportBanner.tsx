import { Image } from "expo-image"
import React from "react"
import { View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Text } from "react-native-paper"
import { colors } from "../../style/colors"

interface SupportBannerProps {}

export const SupportBanner: React.FC<SupportBannerProps> = ({}) => {
    return (
        <View style={[{ position: "relative", marginHorizontal: -50, marginTop: "auto", marginBottom: -50 }]}>
            <LinearGradient
                style={[{ position: "absolute", width: "100%", height: "100%" }]}
                colors={["#01346f", "#038ded"]}
                start={[0, 1]}
                end={[1, 0]}
            />
            <View style={[{flexDirection: "row", padding: 20, alignItems: 'center', gap: 10, justifyContent: 'center'}]}>
                <Image source={require("../../../assets/whatsapp.png")} style={[{ width: 75, aspectRatio: 1 }]} />

                <View style={[{alignItems: 'center', }]}>
                    <Text  style={[{color: colors.secondary, fontSize: 25}]}>atendimento</Text>
                    <Text  style={[{color: colors.secondary, fontSize: 20}]}>+123-458-7890</Text>
                </View>
            </View>
        </View>
    )
}
