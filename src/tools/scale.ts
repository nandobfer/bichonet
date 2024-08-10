import { Dimensions } from "react-native"
import { DESKTOP } from "./orientation"

export const scale = (value: number) => {
    const current_scale = Dimensions.get("window").scale

    return DESKTOP ? value * (1 / current_scale) : value
}
