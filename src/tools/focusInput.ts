import { TextInput } from "react-native"

export const focusInput = (index: number, input_refs: React.RefObject<TextInput>[]) => {
    const ref = input_refs[index].current

    if (ref) {
        try {
            // @ts-ignore
            ref.focus()
        } catch (error) {}
    }
}
