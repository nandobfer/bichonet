import React from "react"
import { View } from "react-native"
import { colors } from "../../style/colors"
import { Text } from "react-native-paper"
import { Image } from "expo-image"
import { HomeButton } from "./HomeButton"
import { SupportBanner } from "./SupportBanner"
import { useLinkTo } from "@react-navigation/native"
import { Logo } from "../../components/Logo"

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    const linkTo = useLinkTo()

    return (
        <View style={{ flex: 1, backgroundColor: colors.background, padding: 50, gap: 30 }}>
            {/* <Text style={{ color: colors.secondary, fontSize: 70, width: "100%" }} adjustsFontSizeToFit={true} numberOfLines={1}>
                BichoNET
            </Text> */}

            <Logo style={{ width: "100%" }} />

            <View style={[{ flexDirection: "row", alignItems: "center", gap: 25 }]}>
                <Text style={[{ color: colors.secondary, fontSize: 17 }]}>Agora você pode apostar quando e onde quiser.</Text>
                <Image source={require("../../../assets/trevo.png")} style={[{ width: 90, aspectRatio: 1 }]} />
            </View>

            <View style={[{ gap: 20 }]}>
                <HomeButton onPress={() => console.log("oi")}>ENTRAR</HomeButton>
                <HomeButton onPress={() => linkTo("/cadastro")}>CADASTRAR</HomeButton>
                <HomeButton onPress={() => console.log("todo")}>JOGAR SEM CADASTRO</HomeButton>
            </View>

            <SupportBanner />
        </View>
    )
}
