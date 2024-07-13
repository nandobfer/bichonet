import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("screen")

export const ORIENTATION = width > height ? "desktop" : "mobile"
