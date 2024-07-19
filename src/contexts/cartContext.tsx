import { createContext, useState } from "react"
import React from "react"
import { BetItem } from "../types/BetItem"

interface CartContextValue {
    bets: BetItem[]
    setBets: React.Dispatch<React.SetStateAction<BetItem[]>>
}

interface CartProviderProps {
    children: React.ReactNode
}

const CartContext = createContext<CartContextValue>({} as CartContextValue)

export default CartContext

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [bets, setBets] = useState<BetItem[]>([])

    return <CartContext.Provider value={{ bets, setBets }}>{children}</CartContext.Provider>
}
