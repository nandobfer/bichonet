import { api } from "../backend/api"
import { QuoteResponse } from "../types/QuoteResponse"

export const getQuotes = async (game_type: number) => {
    try {
        const response = await api.get("/cotacao/public/getall")
        const quotes = response.data as QuoteResponse[]

        // todo: "tem um terno que tem duas cotações mas eu tenho que ver ainda"

        if (game_type == 10) {
            return quotes.filter((item) => item.tipo === 0 || item.tipo === 1)
        }

        return quotes.filter((item) => item.tipo === game_type)
    } catch (error) {
        console.log(error)
    }
}
