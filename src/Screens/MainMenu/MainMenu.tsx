import React, { useCallback, useEffect, useState } from "react"
import { View } from "react-native"
import { colors } from "../../style/colors"
import { Header } from "./Header"
import { Drawer } from "./Drawer"
import { useUser } from "../../hooks/useUser"
import { MenuButton } from "./MenuButton"
import { Text } from "react-native-paper"
import { currencyMask } from "../../tools/currencyMask"
import { ORIENTATION } from "../../tools/orientation"
import { useFocusEffect, useLinkTo } from "@react-navigation/native"
import { DefaultWrapper } from "../../components/DefaultWrapper"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { UserMenu } from "../UserMenu/UserMenu"
import { InfoPage } from "../InfoPage/InfoPage"

interface MainMenuProps {}

const renderScene = SceneMap({ account: UserMenu, info: InfoPage })

export const MainMenu: React.FC<MainMenuProps> = ({}) => {
    const linkTo = useLinkTo()
    const { user } = useUser()

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: "account", title: "Minha conta" },
        { key: "info", title: "Informações" },
    ])

    // useFocusEffect(
    //     useCallback(() => {
    //         console.log(user)
    //         if (!user) {
    //             setTimeout(() => linkTo("/"), 0)
    //         }
    //     }, [user])
    // )

    return (
        <DefaultWrapper>
            {user ? (
                <TabView
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                    style={{ paddingHorizontal: 30 }}
                    sceneContainerStyle={{ marginHorizontal: -30, marginTop: 20 }}
                    renderTabBar={(props) => (
                        <TabBar
                            {...props}
                            style={{
                                backgroundColor: colors.background,
                            }}
                            labelStyle={{ color: colors.secondary, textTransform: "none", fontSize: 24 }}
                            indicatorStyle={{
                                backgroundColor: colors.secondary,
                                borderRadius: 5,
                                height: 5,
                            }}
                        />
                    )}
                />
            ) : (
                <InfoPage />
            )}
        </DefaultWrapper>
    )
}
