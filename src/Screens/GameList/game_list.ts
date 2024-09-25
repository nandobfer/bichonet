import { GameOption } from "../../types/GameOption"

export const game_list: GameOption[] = [
    { label: "MILHAR", path: "milhar", mask: "9999", prizes: [[1], [1, 2, 3, 4, 5]], type: 0 },
    { label: "MILHAR CENTENA", path: "milhar-centena", mask: "9999", prizes: [[1], [1, 2, 3, 4, 5]], type: 10 },
    { label: "CENTENA", path: "centena", mask: "999", prizes: [[1], [1, 2, 3, 4, 5]], type: 1 },
    { label: "GRUPO", path: "grupo", mask: "99", prizes: [[1], [1, 2, 3, 4, 5]], type: 3 },
    {
        label: "PASSE",
        path: "passe",
        secondary_label: "2 BICHOS",
        mask: "99-99",
        prizes: [
            [1, 2],
            [1, 2, 3, 4, 5],
        ],
        type: 8,
    },
    {
        label: "TERNO",
        path: "terno",
        secondary_label: "3 BICHOS",
        mask: "99-99-99",
        prizes: [
            [1, 2, 3],
            [1, 2, 3, 4, 5],
        ],
        type: 7,
    },
    { label: "DEZENA", path: "dezena", mask: "99", prizes: [[1], [1, 2, 3, 4, 5]], type: 2 },
    {
        label: "DUQUE DE DEZENA",
        path: "duque-dezena",
        secondary_label: "2 DEZENAS",
        mask: "99-99",
        prizes: [],
        type: 4,
    },
    {
        label: "TERNO DE DEZENA",
        path: "terno-dezena",
        secondary_label: "3 DEZENAS",
        mask: "99-99-99",
        prizes: [
            [1, 2, 3],
            [1, 2, 3, 4, 5],
        ],
        type: 6,
    },
    // { label: "", path: "", max_chars: 0, prizes: 5 },
]

export const isBicho = (game?: GameOption) => [3, 8, 7].includes(game?.type || 0)