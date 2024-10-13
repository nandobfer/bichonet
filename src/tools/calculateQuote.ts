export const calculateQuote = (betValue: number, quote: string, selectedPrize: number) => {
    const numeric_quote = Number(quote)
    const result = (numeric_quote * betValue) / (selectedPrize || 1)
    return result
}
