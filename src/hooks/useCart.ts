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

    const removeBet = (id: string) => {
        cartContext.setBets((value) => value.filter((item) => item.id !== id))
    }

    return { ...cartContext, addBet, removeBet }
}
