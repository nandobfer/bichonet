import { GameOption } from "./GameOption"

export interface BetItem {
    id: string
    game: GameOption
    betNumber: string
    selectedPrizes: number[]
    betValue: number
}
