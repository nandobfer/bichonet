import { GameOption } from "./GameOption"

export interface BetItem {
    game: GameOption
    betNumber: string
    selectedPrizes: number[]
    betValue: number
}
