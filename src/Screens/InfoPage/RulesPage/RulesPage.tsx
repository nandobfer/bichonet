import React from "react"
import { ScrollView, View } from "react-native"
import { DefaultWrapper } from "../../../components/DefaultWrapper"
import { GameText } from "../../Game/GameText"
import { ORIENTATION } from "../../../tools/orientation"
import { TopicComponent } from "./TopicComponent"
import { scale } from "../../../tools/scale"

interface RulesPageProps {}

export const RulesPage: React.FC<RulesPageProps> = ({}) => {
    return (
        <DefaultWrapper>
            <ScrollView style={[{ flex: 1 }]} contentContainerStyle={[{ padding: scale(30), gap: scale(15), paddingTop: 0 }]}>
                <TopicComponent
                    label="Como Jogar"
                    lines={[
                        "O jogador escolhe um ou mais números de um grupo de animais, cada grupo representando um conjunto de quatro números consecutivos. Por exemplo, o grupo do avestruz inclui os números de 01 a 04.",
                    ]}
                />
                <TopicComponent
                    label="Tipos de Apostas"
                    lines={[
                        "Simples: Aposta em um grupo de quatro números (ex.: grupo do avestruz, números 01 a 04).",
                        "Duque de Dezena: Aposta em dois números de diferentes grupos.",
                        "Terno de Dezena: Aposta em três números de diferentes grupos.",
                        "Milhar: Aposta em um número de quatro dígitos (ex.: 1234).",
                    ]}
                />
                <TopicComponent
                    label="Sorteios"
                    lines={[
                        "Os sorteios são realizados em horários pré-determinados, geralmente de segunda a sábado.",
                        "Cada sorteio revela uma combinação de números que correspondem a diferentes animais e categorias de prêmio.",
                    ]}
                />
                <TopicComponent
                    label="Premiação"
                    lines={[
                        "Os prêmios variam conforme o tipo de aposta e a quantidade de acertos.",
                        "No caso do jogo simples, o prêmio é determinado pela correspondência do número sorteado com o grupo de números apostado.",
                        "Em apostas como Duque de Dezena, Terno de Dezena e Milhar, os prêmios são maiores devido à maior dificuldade de acerto.",
                    ]}
                />
                <TopicComponent
                    label="Regras Gerais"
                    lines={[
                        "Apenas maiores de 18 anos podem participar.",
                        "As apostas devem ser feitas antes do horário do sorteio.",
                        "O valor das apostas é pré-determinado e deve ser pago no ato da aposta.",
                        "A premiação será paga de acordo com os resultados oficiais divulgados pela organização",
                    ]}
                />
            </ScrollView>
        </DefaultWrapper>
    )
}
