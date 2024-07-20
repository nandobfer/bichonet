import * as Yup from "yup"
import { validationErrors } from "../tools/validationErrors"

export const bet_schema = Yup.object().shape({
    nome: Yup.string().required(validationErrors.required),
    phone: Yup.string()
        .required(validationErrors.required)
        .matches(/^\(?\d{2}\)? ?\d ?\d{4}-?\d{4}$/, "Telefone inválido"),
    cpf: Yup.string()
        .required(validationErrors.required)
        .matches(/^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/, "CPF inválido"),
    bets: Yup.array().min(1, "Faça pelo menos uma aposta"),
})
