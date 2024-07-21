import { TransactionResponse } from "../types/TransactionResponse"

export const formatTransactionType = (transaction: TransactionResponse) => {
    const types = {
        0: "Depósito",
        1: "Saque",
        2: "Prêmio",
        3: "Aposta",
    }

    return types[transaction.type]
}
