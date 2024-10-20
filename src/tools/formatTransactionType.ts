import { TransactionItem } from "../types/TransactionItem"

export const formatTransactionType = (transaction: TransactionItem) => {
    const types = {
        0: "Depósito",
        1: "Saque",
        2: "Aposta",
        3: "Prêmio",
    }

    return types[transaction.transactionType]
}
