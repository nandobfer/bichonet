import "@expo/metro-runtime"
import { StatusBar } from "expo-status-bar"
import { Providers } from "./src/Providers"
import { Routes } from "./src/Routes"
import { useKeepAwake } from "expo-keep-awake"
import { Dimensions, SafeAreaView, View } from "react-native"
import * as SplashScreen from "expo-splash-screen"
import { useCallback } from "react"
import { Lato_400Regular, Lato_700Bold, useFonts } from "@expo-google-fonts/lato"
import { colors } from "./src/style/colors"

SplashScreen.preventAutoHideAsync()

// if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
//     UIManager.setLayoutAnimationEnabledExperimental(true)
// }

const {height, width} = Dimensions.get('screen')

export default function App() {
    useKeepAwake()

    let [fontsLoaded, fontError] = useFonts({
        Lato_400Regular,
        Lato_700Bold,
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            // await SplashScreen.hideAsync()
        }
    }, [fontsLoaded, fontError])

    if (!fontsLoaded && !fontError) {
        return null
    }

    return (
        <SafeAreaView onLayout={onLayoutRootView} style={[{ flex: 1, backgroundColor: colors.background }, width > height && { alignItems: 'center'}]}>
            <View style={[width > height && {width: 800, borderColor: 'red', borderWidth: 1}, {flex: 1}]}>
            <Providers>
                <StatusBar animated translucent style={"dark"} />
                <Routes />
            </Providers>
            </View>
        </SafeAreaView>
    )
}
