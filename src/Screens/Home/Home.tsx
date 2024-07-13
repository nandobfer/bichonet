import React from "react"
import { View } from "react-native"
import { colors } from "../../style/colors"
import { Text } from "react-native-paper"
import { Image } from "expo-image"
import { HomeButton } from "./HomeButton"
import { SupportBanner } from "./SupportBanner"
import { useLinkTo } from "@react-navigation/native"
import { Logo } from "../../components/Logo"
import { ORIENTATION } from "../../tools/orientation"

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    const linkTo = useLinkTo()

    return (
        <View
            style={[{ flex: 1, backgroundColor: colors.background }, ORIENTATION == "desktop" ? { flexDirection: "row" } : { padding: 50, gap: 30 }]}
        >
            <Logo style={[ORIENTATION == "mobile" ? { width: "100%" } : { flex: 0.5, height: "auto", margin: 100 }]} />

            <View
                style={[
                    ORIENTATION == "desktop"
                        ? { flex: 0.5, backgroundColor: colors.secondary, padding: 100, gap: 50, paddingBottom: 0 }
                        : { gap: 30 },
                ]}
            >
                <View
                    style={[
                        { flexDirection: "row", alignItems: "center", gap: 25 },
                        ORIENTATION == "desktop" && { flexDirection: "column-reverse", gap: 50 },
                    ]}
                >
                    <Text
                        style={[
                            { color: colors.secondary, fontSize: 17, fontWeight: "bold" },
                            ORIENTATION == "desktop" && { color: colors.background, fontSize: 34, textAlign: "center" },
                        ]}
                    >
                        Agora você pode apostar quando e onde quiser.
                    </Text>
                    <Image
                        source={require("../../../assets/trevo.png")}
                        style={[{ width: 75, aspectRatio: 1 }, ORIENTATION == "desktop" && { width: 150 }]}
                    />
                </View>

                <View style={[{ gap: 20 }, ORIENTATION == "desktop" && { marginTop: 120 }]}>
                    <HomeButton onPress={() => console.log("oi")}>ENTRAR</HomeButton>
                    <HomeButton onPress={() => linkTo("/cadastro")}>CADASTRAR</HomeButton>
                    <HomeButton onPress={() => linkTo("/inicio")}>JOGAR SEM CADASTRO</HomeButton>
                </View>
                {ORIENTATION == "desktop" && <SupportBanner />}
            </View>
            {ORIENTATION == "mobile" && <SupportBanner />}
        </View>
    )
}
