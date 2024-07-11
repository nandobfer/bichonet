import React from "react"
import { View } from "react-native"
import { colors } from "../../style/colors"
import { Text } from "react-native-paper"
import { Image } from "expo-image"
import { HomeButton } from "./HomeButton"
import { SupportBanner } from "./SupportBanner"
import { useLinkTo } from "@react-navigation/native"

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    const linkTo = useLinkTo()

    return (
        <View style={{ flex: 1, backgroundColor: colors.background, padding: 50, gap: 50 }}>
            <Text style={{ color: colors.secondary, fontSize: 70, width: "100%" }} adjustsFontSizeToFit={true} numberOfLines={1}>
                BichoNET
            </Text>

            <View style={[{ flexDirection: "row", alignItems: "center", gap: 25 }]}>
                <Text style={[{ color: colors.secondary, fontSize: 18 }]}>Agora você pode apostar quando e onder quiser.</Text>
                <Image source={require("../../../assets/trevo.png")} style={[{ width: 150, aspectRatio: 1 }]} />
            </View>

            <View style={[{ gap: 30 }]}>
                <HomeButton onPress={() => console.log("oi")}>ENTRAR</HomeButton>
                <HomeButton onPress={() => linkTo("/cadastro")}>CADASTRAR</HomeButton>
            </View>

            <SupportBanner />
        </View>
    )
}
