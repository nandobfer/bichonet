import { Dimensions } from "react-native"
import { WEB } from "./orientation"

export const scale = (value: number) => {
    const current_scale = Dimensions.get("window").scale

    return WEB ? value * (1 / current_scale) : value
}
