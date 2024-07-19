import { GameOption } from "../../types/GameOption"

export const game_list: GameOption[] = [
    { label: "MILHAR", path: "milhar", max_chars: 4, prizes: 5, type: 0 },
    { label: "MILHAR CENTENA", path: "milhar-centena", max_chars: 7, prizes: 5, type: 10 },
    { label: "CENTENA", path: "centena", max_chars: 3, prizes: 5, type: 1 },
    { label: "GRUPO", path: "grupo", max_chars: 3, prizes: 5, type: 3 },
    { label: "PASSE", path: "passe", secondary_label: "2 BICHOS", max_chars: 1, prizes: 5, type: 8 },
    { label: "TERNO", path: "terno", secondary_label: "3 BICHOS", max_chars: 3, prizes: 5, type: 7 },
    { label: "DEZENA", path: "dezena", max_chars: 2, prizes: 5, type: 2 },
    { label: "DUQUE DE DEZENA", path: "duque-dezena", secondary_label: "2 DEZENAS", max_chars: 4, prizes: 5, type: 4 },
    { label: "TERNO DE DEZENA", path: "terno-dezena", secondary_label: "3 DEZENAS", max_chars: 6, prizes: 5, type: 6 },
    // { label: "", path: "", max_chars: 0, prizes: 5 },
]
