import React from "react"
import { FlatList, View } from "react-native"
import { Header } from "../MainMenu/Header"
import { Drawer } from "../MainMenu/Drawer"
import { colors } from "../../style/colors"
import { ORIENTATION } from "../../tools/orientation"
import { game_list } from "./game_list"
import { GameListButton } from "./GameListButton"
import { Text } from "react-native-paper"
import { DefaultWrapper } from "../../components/DefaultWrapper"
import { scale } from "../../tools/scale"

interface GameListProps {}

export const GameList: React.FC<GameListProps> = ({}) => {
    return (
        <DefaultWrapper>
            <Text style={[{ color: colors.secondary, fontSize: scale(22), padding: scale(30), textAlign: "center", paddingTop: 0 }]}>
                Escolha qual modalidade você quer apostar
            </Text>

            <FlatList
                numColumns={3}
                data={game_list}
                renderItem={({ item }) => <GameListButton option={item} />}
                keyExtractor={(item) => item.path}
                contentContainerStyle={[{ paddingHorizontal: scale(30), gap: scale(20), paddingBottom: scale(20) }]}
                columnWrapperStyle={[{ gap: scale(20) }]}
            />
        </DefaultWrapper>
    )
}
