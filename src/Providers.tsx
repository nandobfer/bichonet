import React from "react"
import { navigation_theme, paper_theme } from "./style/theme"
import { PaperProvider, Text } from "react-native-paper"
import { UserProvider } from "./contexts/userContext"
import { NavigationContainer } from "@react-navigation/native"
import constants from "expo-constants"
import { DrawerProvider } from "./contexts/drawerContext"

interface ProvidersProps {
    children?: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <NavigationContainer
            theme={navigation_theme}
            linking={{
                prefixes: ["http://192.168.18.121:8081", "http://localhost:8081", "https://bichonet.nandoburgos.dev"],
                config: {
                    screens: {
                        home: {
                            path: "",
                            // @ts-ignore
                            screens: {
                                // login: "login",
                                // budget: "budget",
                                // budgetSuccess: "budget/success",
                                // forgotPassword: "forgot-password",
                                // codeVerification: "forgot-password/verification",
                                // resetPassword: "forgot-password/reset",
                                // successComponent: "forgot-password/success",
                            },
                        },
                        signup: "cadastro",
                        mainmenu: "inicio",
                        gamelist: "jogar",
                        notfound: "*",
                    },
                },
            }}
            documentTitle={{ formatter: (options, route) => `JBSORTE - ${route?.path}` }}
        >
            <PaperProvider theme={paper_theme}>
                <UserProvider>
                    <DrawerProvider>
                        {children}
                        <Text style={{ position: "absolute", bottom: 5, right: 5, color: "red" }}>{constants.expoConfig?.version}</Text>
                    </DrawerProvider>
                </UserProvider>
            </PaperProvider>
        </NavigationContainer>
    )
}
