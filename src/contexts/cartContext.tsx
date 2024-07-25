import { createContext, useEffect, useState } from "react"
import React from "react"
import { BetItem } from "../types/BetItem"

interface CartContextValue {
    bets: BetItem[]
    setBets: React.Dispatch<React.SetStateAction<BetItem[]>>

    total: number
}

interface CartProviderProps {
    children: React.ReactNode
}

const CartContext = createContext<CartContextValue>({} as CartContextValue)

export default CartContext

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [bets, setBets] = useState<BetItem[]>([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        setTotal(bets.reduce((total, bet) => (total += bet.betValue * bet.selectedPrizes.length), 0))
    }, [bets])

    return <CartContext.Provider value={{ bets, setBets, total }}>{children}</CartContext.Provider>
}
