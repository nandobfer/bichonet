export const isPrizeSelected = (flag: number, value: number) => {
    return (value & flag) !== 0
}
