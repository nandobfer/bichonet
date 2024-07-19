export const calculateQuote = (betValue: number, quote: string) => {
    const numeric_quote = Number(quote)
    const result = numeric_quote * betValue
    return result
}
