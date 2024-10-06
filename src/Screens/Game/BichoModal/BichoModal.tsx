import React, { useState } from "react"
import { FlatList, View } from "react-native"
import { IconButton, Modal, Text } from "react-native-paper"
import { colors } from "../../../style/colors"
import { GameText } from "../GameText"
import { BichoContainer } from "./BichoContainer"
import { bichos } from "../bichos_list"
import { MenuButton } from "../../MainMenu/MenuButton"
import { scale } from "../../../tools/scale"
import { GameOption } from "../../../types/GameOption"
import { BetsFlatlist } from "../BetsFlatlist"
import { DESKTOP } from "../../../tools/orientation"

interface SelectBichoModalProps {
    open: boolean
    onClose: () => void
    bets: string[]
    setBets: React.Dispatch<React.SetStateAction<string[]>>
    game: GameOption
}

export const BichoModal: React.FC<SelectBichoModalProps> = ({ open, onClose, setBets, bets, game }) => {
    const bichos_list = Object.entries(bichos)
    const max_bichos = game.mask.split("-").length

    const [selectedBichos, setSelectedBichos] = useState<string[]>([])

    const onBichoPress = (bicho: string) => {
        if (selectedBichos.includes(bicho)) {
            setSelectedBichos((selectedBichos) => selectedBichos.filter((item) => item !== bicho))
        } else {
            if (max_bichos === 1) {
                setSelectedBichos([bicho])
                return
            }

            if (selectedBichos.length === max_bichos) return
            setSelectedBichos((selectedBichos) => [...selectedBichos, bicho])
        }
    }

    const handleAddBicho = (value: string) => {
        setBets((bets) => [...bets, value])
    }

    const onConfirm = () => {
        if (selectedBichos.length !== max_bichos) return

        const bicho_string = selectedBichos.join("-")
        if (!bets.includes(bicho_string)) {
            handleAddBicho(bicho_string)
        }
        setSelectedBichos([])
    }

    return (
        <Modal
            visible={open}
            onDismiss={onClose}
            dismissable={false}
            contentContainerStyle={[
                { padding: scale(20), alignSelf: "center", backgroundColor: colors.background, borderRadius: 15, gap: scale(15) },
            ]}
        >
            <View style={[{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
                <GameText style={[{ fontSize: scale(24), fontWeight: "bold" }]}>Selecionar bicho</GameText>
                <IconButton icon={"close-circle"} iconColor={colors.secondary} style={[{ margin: 0 }]} onPress={onClose} />
            </View>

            <View style={[{ width: scale(365) }, DESKTOP && { width: 415 }]}>
                <BetsFlatlist bets={bets} setBets={setBets} />
            </View>

            <FlatList
                data={bichos_list}
                renderItem={({ item, index }) => (
                    <BichoContainer
                        name={item[0]}
                        image={item[1]}
                        value={index.toString().padStart(2, "0")}
                        onBichoPress={onBichoPress}
                        selected={selectedBichos.includes(index.toString().padStart(2, "0"))}
                    />
                )}
                numColumns={5}
                style={[{ flex: 1, marginHorizontal: scale(-20) }]}
                columnWrapperStyle={[{ gap: scale(5) }]}
                contentContainerStyle={[{ gap: scale(5), paddingVertical: scale(10), paddingHorizontal: scale(20) }]}
                scrollEnabled={false}
            />

            <MenuButton buttonColor={selectedBichos.length === max_bichos ? colors.success : colors.primary} onPress={onConfirm}>
                Continuar
            </MenuButton>
        </Modal>
    )
}
