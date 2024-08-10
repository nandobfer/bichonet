import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("screen")

export const ORIENTATION = width > height ? "desktop" : "mobile"
export const WEB = ORIENTATION === "desktop"
export const MOBILE = ORIENTATION === "mobile"
