import { useContext } from "react"
import CartContext from "../contexts/cartContext"
import { BetForm } from "../types/BetForm"
import { useDrawer } from "./useDrawer"
import { BetItem } from "../types/BetItem"

export const useCart = () => {
    const cartContext = useContext(CartContext)
    const { toggleDrawer } = useDrawer()

    const addBet = (bet: BetItem) => {
        cartContext.setBets((value) => [...value, bet])
        toggleDrawer()
    }

    return { ...cartContext, addBet }
}
