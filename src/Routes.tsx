import React, { useEffect } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { default_navigator_options } from "./tools/default_navigator_options"
import { NotFound } from "./Screens/NotFound"
import { Home } from "./Screens/Home/Home"
import { Signup } from "./Screens/Signup/Signup"
import { MainMenu } from "./Screens/MainMenu/MainMenu"

interface RoutesProps {}

export type HomeStackParams = {
    home: undefined
    signup: undefined
    notfound: undefined
    mainmenu: undefined
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
            <Stack.Screen name="notfound" component={NotFound} />
            <Stack.Screen name="mainmenu" component={MainMenu} />
        </Stack.Navigator>
    )
}
