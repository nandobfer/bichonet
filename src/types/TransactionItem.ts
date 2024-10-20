export enum TransactionType {
    DEPOSIT = 0,
    WITHDRAW = 1,
    PURCHASE = 2,
}

export interface TransactionItem {
    amount: string
    createdAt: string
    deletedAt: string | null
    id: number
    observacao: string
    transactionType: TransactionType
    updatedAt: string
}
