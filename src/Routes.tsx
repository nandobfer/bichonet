import React, { useEffect } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { default_navigator_options } from "./tools/default_navigator_options"
import { NotFound } from "./Screens/NotFound"
import { Home } from "./Screens/Home/Home"
import { Signup } from "./Screens/Signup/Signup"
import { MainMenu } from "./Screens/MainMenu/MainMenu"
import { GameList } from "./Screens/GameList/GameList"
import { Game } from "./Screens/Game/Game"
import { QuotationsPage } from "./Screens/InfoPage/QuotationPage/QuotationsPage"
import { RulesPage } from "./Screens/InfoPage/RulesPage/RulesPage"
import { Wallet } from "./Screens/Wallet/Wallet"

interface RoutesProps {}

export type HomeStackParams = {
    home: undefined
    signup: undefined
    mainmenu: undefined
    gamelist: undefined
    notfound: undefined
    quotations: undefined
    game: undefined
    wallet: undefined
    rules: undefined
}

const Stack = createNativeStackNavigator<HomeStackParams>()

export const Routes: React.FC<RoutesProps> = ({}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                ...default_navigator_options,
                header: undefined,
                headerShown: false,
            }}
        >
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="mainmenu" component={MainMenu} />
            <Stack.Screen name="gamelist" component={GameList} />
            <Stack.Screen name="game" component={Game} />
            <Stack.Screen name="quotations" component={QuotationsPage} />
            <Stack.Screen name="rules" component={RulesPage} />
            <Stack.Screen name="wallet" component={Wallet} />
            <Stack.Screen name="notfound" component={NotFound} />
        </Stack.Navigator>
    )
}
