import React, { useCallback, useState } from "react"
import { ScrollView, View } from "react-native"
import { colors } from "../../style/colors"
import { Text } from "react-native-paper"
import { Image } from "expo-image"
import { HomeButton } from "./HomeButton"
import { SupportBanner } from "./SupportBanner"
import { useFocusEffect, useLinkTo } from "@react-navigation/native"
import { Logo } from "../../components/Logo"
import { MOBILE, DESKTOP } from "../../tools/orientation"
import { LoginForm } from "./LoginForm"
import { Signup } from "../Signup/Signup"
import { SignupForm } from "../Signup/SignupForm"
import { scale } from "../../tools/scale"
import { useUser } from "../../hooks/useUser"

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    const linkTo = useLinkTo()

    const { setUser } = useUser()

    const [loginForm, setLoginForm] = useState(false)
    const [signupForm, setSignupForm] = useState(false)

    useFocusEffect(
        useCallback(() => {
            setUser(null)
        }, [])
    )

    return (
        <View style={[{ flex: 1, backgroundColor: colors.background }, DESKTOP ? { flexDirection: "row" } : { padding: 50, paddingBottom: 0 }]}>
            <Logo style={[MOBILE ? { width: "100%" } : { flex: 0.8, height: "auto", margin: scale(100) }]} />

            <ScrollView
                keyboardShouldPersistTaps="handled"
                style={[DESKTOP ? { flex: 1, backgroundColor: colors.secondary } : { marginHorizontal: -50 }]}
                contentContainerStyle={[
                    DESKTOP
                        ? { padding: scale(100), gap: scale(50), paddingBottom: 0, flex: 1 }
                        : { gap: 30, paddingHorizontal: 50, paddingBottom: 0, paddingTop: 30, flex: 1 },
                ]}
            >
                <View
                    style={[{ flexDirection: "row", alignItems: "center", gap: 25 }, DESKTOP && { flexDirection: "column-reverse", gap: scale(50) }]}
                >
                    <Text
                        style={[
                            { color: colors.secondary, fontSize: 17, fontWeight: "bold" },
                            DESKTOP && { color: colors.background, fontSize: scale(34), textAlign: "center" },
                        ]}
                    >
                        Agora você pode apostar quando e onde quiser.
                    </Text>
                    <Image source={require("../../../assets/trevo.png")} style={[{ width: 75, aspectRatio: 1 }, DESKTOP && { width: scale(150) }]} />
                </View>

                {loginForm ? (
                    <LoginForm goBack={() => setLoginForm(false)} />
                ) : signupForm ? (
                    <View>
                        <SignupForm goBack={() => setSignupForm(false)} />
                    </View>
                ) : (
                    <View style={[{ gap: scale(30) }, DESKTOP && { marginTop: scale(90) }]}>
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
