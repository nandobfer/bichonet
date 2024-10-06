import React from "react"
import { View } from "react-native"
import { scale } from "../../tools/scale"
import { MOBILE } from "../../tools/orientation"

interface PerforatedEdgesProps {
    arrow: "up" | "down"
}

const SIZE = scale(5)

export const PerforatedEdges: React.FC<PerforatedEdgesProps> = ({ arrow }) => {
    return (
        <View
            style={[
                { flex: 1, overflow: "hidden", flexDirection: "row", position: "absolute", left: 0, right: 0 },
                arrow === "up" ? { top: -SIZE } : { bottom: -SIZE },
            ]}
        >
            {new Array(MOBILE ? 30 : 50).fill(1).map((_, index) => (
                <View
                    key={index}
                    style={[
                        {
                            width: 0,
                            height: 0,
                            borderLeftWidth: SIZE,
                            borderRightWidth: SIZE,
                            borderLeftColor: "transparent",
                            borderRightColor: "transparent",
                        },
                        arrow === "up"
                            ? { borderBottomColor: "#f9f9f4", borderBottomWidth: SIZE }
                            : { borderTopColor: "#f9f9f4", borderTopWidth: SIZE },
                    ]}
                />
            ))}
        </View>
    )
}
