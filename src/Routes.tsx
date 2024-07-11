import React, { useEffect } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { default_navigator_options } from "./tools/default_navigator_options"
import { NotFound } from "./Screens/NotFound"
import { Home } from "./Screens/Home/Home"

interface RoutesProps {}

export type HomeStackParams = {
    home: undefined
    notfound: undefined
    systemChooser: undefined
    admin: undefined
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
            <Stack.Screen name="notfound" component={NotFound} />
        </Stack.Navigator>
    )
}
