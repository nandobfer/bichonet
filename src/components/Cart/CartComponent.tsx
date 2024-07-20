import React, { useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import { Button, IconButton, Text } from "react-native-paper"
import { colors } from "../../style/colors"
import { useCart } from "../../hooks/useCart"
import { BetComponent } from "./BetComponent"
import { game_list } from "../../Screens/GameList/game_list"
import { BettedGameComponent } from "./BettedGameComponent"
import { useDrawer } from "../../hooks/useDrawer"
import { ORIENTATION } from "../../tools/orientation"
import { useFormik } from "formik"
import { BetForm } from "../../types/BetForm"
import { useUser } from "../../hooks/useUser"
import { bet_schema } from "../../schemas/bet_schema"
import { BetFormComponent } from "./BetFormComponent"
import { api } from "../../backend/api"
import unmask from "../../tools/unmask"

interface CartComponentProps {}

export const CartComponent: React.FC<CartComponentProps> = ({}) => {
    const { toggleDrawer } = useDrawer()
    const { bets, total } = useCart()
    const { user, accessToken } = useUser()

    const bettedGames = game_list.filter((item) => bets.find((bet) => bet.game.type == item.type))

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
            turnos: [],
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
        // validationSchema: bet_schema,
        validateOnChange: false,
        enableReinitialize: true,
    })

    useEffect(() => {
        formik.validateField("bets")
    }, [total])

    return (
        <View style={[{ paddingBottom: 30, gap: 20 }]}>
            <View style={[{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
                <Text style={[{ fontSize: 30, color: colors.secondary, fontWeight: "bold" }, ORIENTATION == "desktop" && { fontSize: 35 }]}>
                    Carrinho
                </Text>
                <IconButton
                    onPress={() => toggleDrawer()}
                    icon={"close-circle"}
                    style={[{ alignSelf: "flex-end", margin: 0 }]}
                    iconColor={colors.secondary}
                    size={ORIENTATION == "desktop" ? 50 : 35}
                />
            </View>

            <FlatList
                data={bettedGames}
                renderItem={({ item }) => <BettedGameComponent game={item} bets={bets.filter((bet) => bet.game.type === item.type)} />}
                contentContainerStyle={[{ paddingVertical: 10, gap: 20 }]}
                ListFooterComponent={<BetComponent label="TOTAL" value={total} bold error={formik.errors.bets} />}
            />
            {!!formik.errors.bets && <Text style={[{ color: colors.error, marginTop: -10 }]}>{formik.errors.bets?.toString()}</Text>}

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
