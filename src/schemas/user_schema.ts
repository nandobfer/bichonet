import * as Yup from "yup"
import { validationErrors } from "../tools/validationErrors"

export const user_schema = Yup.object().shape({
    name: Yup.string().required(validationErrors.required),
    phone: Yup.string()
        .required(validationErrors.required)
        .matches(/^\(\d{2}\) \d \d{4}-\d{4}$/, "Telefone inválido"),
    password: Yup.string()
        .min(8, "Senha precisa ter pelo menos 8 caracteres")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "Senha precisa conter pelo menos uma letra maiúscula, uma letra minúscula e um número .")
        .required(validationErrors.required),
    confirm_password: Yup.string()
        .required(validationErrors.required)
        .test("passwords-match", "Senhas não conferem", function (value) {
            return this.parent.password === value
        }),
})
