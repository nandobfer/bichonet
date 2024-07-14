import { GameOption } from "../../types/GameOption"

export const game_list: GameOption[] = [
    { label: "MILHAR", path: "milhar", max_chars: 4 },
    { label: "MILHAR CENTENA", path: "milhar-centena", max_chars: 7 },
    { label: "CENTENA", path: "centena", max_chars: 3 },
    { label: "PASSE", path: "passe", secondary_label: "2 BICHOS", max_chars: 1 },
    { label: "TERNO", path: "terno", secondary_label: "3 BICHOS", max_chars: 3 },
    { label: "DEZENA", path: "dezena", max_chars: 2 },
    { label: "DUQUE DE DEZENA", path: "duque-dezena", secondary_label: "2 DEZENAS", max_chars: 4 },
    { label: "TERNO DE DEZENA", path: "terno-dezena", secondary_label: "3 DEZENAS", max_chars: 6 },
    { label: "", path: "", max_chars: 0 },
]
