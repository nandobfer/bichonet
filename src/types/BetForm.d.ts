export interface BetForm {
    nome: string
    cpf: string
    phone: string
    bets: BetItemForm[]
    turnos: number[]
    tipoPayment: number
}

export interface BetItemForm {
    betNumber: string
    tipoPremioAberto: string
    tipo: number
    valor: number
}