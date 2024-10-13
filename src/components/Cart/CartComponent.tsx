import React, { useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import { Button, IconButton, Text } from "react-native-paper"
import { colors } from "../../style/colors"
import { useCart } from "../../hooks/useCart"
import { BetComponent } from "./BetComponent"
import { game_list } from "../../Screens/GameList/game_list"
import { BettedGameComponent } from "./BettedGameComponent"
import { useDrawer } from "../../hooks/useDrawer"
import { ORIENTATION, DESKTOP } from "../../tools/orientation"
import { useFormik } from "formik"
import { BetForm } from "../../types/BetForm"
import { useUser } from "../../hooks/useUser"
import { bet_schema } from "../../schemas/bet_schema"
import { BetFormComponent } from "./BetFormComponent"
import { api } from "../../backend/api"
import unmask from "../../tools/unmask"
import { scale } from "../../tools/scale"
import { PerforatedEdges } from "./PerforatedEdges"
import { GameOption } from "../../types/GameOption"
import { BetItem } from "../../types/BetItem"

interface CartComponentProps {}

export const CartComponent: React.FC<CartComponentProps> = ({}) => {
    const { toggleDrawer } = useDrawer()
    const { bets, total } = useCart()
    const { user, accessToken } = useUser()

    // const bettedGames = game_list.filter((item) => bets.find((bet) => bet.game.type == item.type))
    const bettedGames: (GameOption & { selectedPrize: number })[] = []
    bets.forEach((bet) => {
        if (!bettedGames.find((item) => item.type === bet.game.type && item.selectedPrize === bet.selectedPrizes.length)) {
            bettedGames.push({ ...game_list.find((item) => item.type === bet.game.type)!, selectedPrize: bet.selectedPrizes.length })
        }
    })

    const [loading, setLoading] = useState(false)

    const formik = useFormik<BetForm>({
        initialValues: {
            bets: bets.map((item) => ({
                betNumber: item.betNumber,
                tipo: item.game.type,
                tipoPremioAberto: JSON.stringify(item.selectedPrizes),
                valor: item.betValue,
            })),
            cpf: user?.cpf || "",
            nome: user?.name || "",
            phone: user?.phone || "",
            tipoPayment: 0,
            turnos: [0],
        },
        async onSubmit(values, formikHelpers) {
            if (loading) return

            setLoading(true)
            try {
                const response = await api.post(
                    user ? "/purchase" : "/purchase/public",
                    {
                        ...values,
                        cpf: unmask(values.cpf),
                        phone: unmask(values.phone),
                    },
                    user ? { headers: { Authorization: `Bearer ${accessToken}` } } : undefined
                )
                console.log(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        },
        validationSchema: bet_schema,
        validateOnChange: false,
        enableReinitialize: true,
    })

    useEffect(() => {
        formik.validateField("bets")
    }, [total])

    return (
        <View style={[{ paddingBottom: scale(30), gap: scale(20) }]}>
            <View style={[{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
                <Text style={[{ fontSize: 30, color: colors.secondary, fontWeight: "bold" }, DESKTOP && { fontSize: scale(35) }]}>Carrinho</Text>
                <IconButton
                    onPress={() => toggleDrawer()}
                    icon={"close-circle"}
                    style={[{ alignSelf: "flex-end", margin: 0 }]}
                    iconColor={colors.secondary}
                    size={DESKTOP ? scale(50) : 35}
                />
            </View>

            <View
                style={[
                    {
                        backgroundColor: "#f9f9f4", // White background to mimic paper
                        padding: scale(20),
                        borderRadius: scale(5),
                        borderWidth: scale(1),
                        borderColor: "#ccc", // Light gray border
                        // Shadow for iOS
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: scale(2),
                        // Elevation for Android
                        elevation: 3,
                        position: "relative",
                    },
                ]}
            >
                <PerforatedEdges arrow="up" />
                <FlatList
                    data={bettedGames}
                    renderItem={({ item }) => (
                        <BettedGameComponent
                            game={item}
                            bets={bets.filter((bet) => bet.game.type === item.type && bet.selectedPrizes.length === item.selectedPrize)}
                            prize={item.selectedPrize}
                        />
                    )}
                    contentContainerStyle={[{ paddingVertical: scale(10), gap: scale(20) }]}
                    ListFooterComponent={<BetComponent label="TOTAL" value={total} bold error={formik.errors.bets} />}
                />
                <PerforatedEdges arrow="down" />
            </View>
            {!!formik.errors.bets && <Text style={[{ color: colors.error, marginTop: scale(-10) }]}>{formik.errors.bets?.toString()}</Text>}

            <BetFormComponent formik={formik} />

            <Button
                mode="contained"
                buttonColor={colors.success}
                textColor={colors.background}
                labelStyle={[{ fontSize: 22, fontWeight: "bold" }]}
                onPress={() => formik.handleSubmit()}
                loading={loading}
            >
                PAGAR
            </Button>
        </View>
    )
}
