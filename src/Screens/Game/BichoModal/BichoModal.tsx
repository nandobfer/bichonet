import React from "react"
import { FlatList, View } from "react-native"
import { IconButton, Modal, Text } from "react-native-paper"
import { colors } from "../../../style/colors"
import { GameText } from "../GameText"
import { BichoContainer } from "./BichoContainer"
import { bichos } from "../bichos_list"
import { MenuButton } from "../../MainMenu/MenuButton"

interface SelectBichoModalProps {
    open: boolean
    onClose: () => void
    onBichoPress: (value: string) => void
    selected_values: string[]
}

export const BichoModal: React.FC<SelectBichoModalProps> = ({ open, onClose, onBichoPress, selected_values }) => {
    const bichos_list = Object.entries(bichos)

    return (
        <Modal
            visible={open}
            onDismiss={onClose}
            dismissable={false}
            contentContainerStyle={[{ padding: 20, alignSelf: "center", backgroundColor: colors.background, borderRadius: 15, gap: 15 }]}
        >
            <View style={[{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
                <GameText style={[{ fontSize: 24, fontWeight: "bold" }]}>Selecionar bicho</GameText>
                <IconButton icon={"close-circle"} iconColor={colors.secondary} style={[{ margin: 0 }]} onPress={onClose} />
            </View>

            <FlatList
                data={bichos_list}
                renderItem={({ item, index }) => (
                    <BichoContainer
                        name={item[0]}
                        image={item[1]}
                        value={index.toString().padStart(2, "0")}
                        onBichoPress={onBichoPress}
                        selected={selected_values.includes(index.toString().padStart(2, "0"))}
                    />
                )}
                numColumns={5}
                style={[{ flex: 1, marginHorizontal: -20 }]}
                columnWrapperStyle={[{ gap: 5 }]}
                contentContainerStyle={[{ gap: 5, paddingVertical: 10, paddingHorizontal: 20 }]}
                scrollEnabled={false}
            />

            <MenuButton buttonColor={selected_values.length === 0 ? colors.primary : colors.success} onPress={onClose}>
                Continuar
            </MenuButton>
        </Modal>
    )
}
