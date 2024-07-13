import React, { useState } from "react"
import { ScrollView, View } from "react-native"
import { colors } from "../../style/colors"
import { Text } from "react-native-paper"
import { Image } from "expo-image"
import { HomeButton } from "./HomeButton"
import { SupportBanner } from "./SupportBanner"
import { useLinkTo } from "@react-navigation/native"
import { Logo } from "../../components/Logo"
import { ORIENTATION } from "../../tools/orientation"
import { LoginContainer } from "./LoginContainer"
import { Signup } from "../Signup/Signup"
import { SignupForm } from "../Signup/SignupForm"

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    const linkTo = useLinkTo()

    const [loginForm, setLoginForm] = useState(false)
    const [signupForm, setSignupForm] = useState(false)

    return (
        <View
            style={[
                { flex: 1, backgroundColor: colors.background },
                ORIENTATION == "desktop" ? { flexDirection: "row" } : { padding: 50, paddingBottom: 0 },
            ]}
        >
            <Logo style={[ORIENTATION == "mobile" ? { width: "100%" } : { flex: 0.5, height: "auto", margin: 100 }]} />

            <ScrollView
                keyboardShouldPersistTaps="handled"
                style={[ORIENTATION == "desktop" ? { flex: 0.5, backgroundColor: colors.secondary } : { marginHorizontal: -50 }]}
                contentContainerStyle={[
                    ORIENTATION == "desktop"
                        ? { padding: 100, gap: 50, paddingBottom: 0, flex: 1 }
                        : { gap: 30, paddingHorizontal: 50, paddingBottom: 0, paddingTop: 30, flex: 1 },
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

                {loginForm ? (
                    <LoginContainer goBack={() => setLoginForm(false)} />
                ) : signupForm ? (
                    <View>
                        <SignupForm goBack={() => setSignupForm(false)} />
                    </View>
                ) : (
                    <View style={[{ gap: 30 }, ORIENTATION == "desktop" && { marginTop: 90 }]}>
                        <HomeButton onPress={() => setLoginForm(true)}>ENTRAR</HomeButton>
                        <HomeButton onPress={() => setSignupForm(true)}>CADASTRAR</HomeButton>
                        <HomeButton onPress={() => linkTo("/inicio")}>JOGAR SEM CADASTRO</HomeButton>
                    </View>
                )}
                <SupportBanner />
            </ScrollView>
        </View>
    )
}
