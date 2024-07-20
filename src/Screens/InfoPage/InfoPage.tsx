import React from "react"
import { View } from "react-native"
import { MenuButton } from "../MainMenu/MenuButton"
import { DefaultMenuWrapper } from "../../components/DefaultMenuWrapper"
import { useUser } from "../../hooks/useUser"
import { useLinkTo } from "@react-navigation/native"

interface InfoPageProps {}

export const InfoPage: React.FC<InfoPageProps> = ({}) => {
    const linkTo = useLinkTo()
    const { user } = useUser()

    return (
        <DefaultMenuWrapper>
            {!user && <MenuButton onPress={() => linkTo("/jogar")}>JOGAR</MenuButton>}
            <MenuButton onPress={() => linkTo("/cotacoes")}>COTAÇÃO</MenuButton>
            <MenuButton>REGRAS</MenuButton>
            <MenuButton>RESULTADOS</MenuButton>
            <MenuButton>TABELA DOS BICHOS</MenuButton>
        </DefaultMenuWrapper>
    )
}
