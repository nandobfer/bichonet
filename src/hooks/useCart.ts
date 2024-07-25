import { useContext } from "react"
import CartContext from "../contexts/cartContext"
import { BetForm } from "../types/BetForm"
import { useDrawer } from "./useDrawer"
import { BetItem } from "../types/BetItem"

export const useCart = () => {
    const cartContext = useContext(CartContext)
    const { toggleDrawer } = useDrawer()

    const addBet = (bets: BetItem[]) => {
        cartContext.setBets((value) => [...value, ...bets])
        toggleDrawer()
    }

    const removeBet = (id: string) => {
        cartContext.setBets((value) => value.filter((item) => item.id !== id))
    }

    return { ...cartContext, addBet, removeBet }
}
