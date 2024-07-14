import { GameOption } from "../../types/GameOption"

export const game_list: GameOption[] = [
    { label: "MILHAR", path: "milhar" },
    { label: "MILHAR CENTENA", path: "milhar-centena" },
    { label: "CENTENA", path: "centena" },
    { label: "PASSE", path: "passe", secondary_label: "2 BICHOS" },
    { label: "TERNO", path: "terno", secondary_label: "3 BICHOS" },
    { label: "DEZENA", path: "dezena" },
    { label: "DUQUE DE DEZENA", path: "duque-dezena", secondary_label: "2 DEZENAS" },
    { label: "TERNO DE DEZENA", path: "terno-dezena", secondary_label: "3 DEZENAS" },
    { label: "", path: "" },
]
