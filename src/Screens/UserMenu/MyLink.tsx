import React, { useRef, useState } from "react"
import { Animated, View } from "react-native"
import { useUser } from "../../hooks/useUser"
import { GameText } from "../Game/GameText"
import { TextInput } from "react-native-paper"
import { ORIENTATION, WEB } from "../../tools/orientation"
import { colors } from "../../style/colors"
import Clipboard from "@react-native-clipboard/clipboard"
import { scale } from "../../tools/scale"

interface MyLinkProps {}

export const MyLink: React.FC<MyLinkProps> = ({}) => {
    const { user } = useUser()
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        Clipboard.setString(link)
        setCopied(true)
        setTimeout(() => setCopied(false), 1000 * 5) // Reset after 2 seconds
    }

    const link = `https://bichonet.nandoburgos.dev/cadastro?convite=${user?.id}`

    return user ? (
        <View style={[{ gap: scale(10), marginTop: "auto", paddingBottom: scale(40) }]}>
            <GameText style={[{ fontSize: 22 }, WEB && { fontSize: scale(24) }]}>Meu Link</GameText>
            <TextInput
                mode="outlined"
                value={link}
                readOnly
                outlineColor={colors.secondary}
                textColor={colors.secondary}
                outlineStyle={[{ backgroundColor: colors.background, borderRadius: 15 }]}
                right={<TextInput.Icon icon={"content-copy"} color={colors.primary} onPress={handleCopy} />}
            />
            <GameText style={[{ color: colors.secondary }, WEB && { fontSize: scale(18) }, copied && { color: colors.success, fontWeight: "bold" }]}>
                {copied ? "Copiado!" : "Use este link para convidar seus amigos e ganhar tal tal tal"}
            </GameText>
        </View>
    ) : null
}
