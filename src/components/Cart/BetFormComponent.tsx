import React, { useRef } from "react"
import { TextInput, View } from "react-native"
import { BetForm } from "../../types/BetForm"
import { FormikErrors, FormikTouched } from "formik"
import { FormText, FormTextProps } from "../FormText"
import { SignupInput } from "../../Screens/Signup/SignupInput"
import { colors } from "../../style/colors"
import { focusInput } from "../../tools/focusInput"
import { GameText } from "../../Screens/Game/GameText"
import lodash from "lodash"
import { mask } from "react-native-mask-text"

interface BetFormProps {
    formik: {
        values: BetForm
        initialValues: BetForm
        errors: FormikErrors<BetForm>
        touched: FormikTouched<BetForm>
        handleChange: (e: React.ChangeEvent<any>) => void
        handleBlur: {
            (e: React.FocusEvent<any, Element>): void
            <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void
        }
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<BetForm>>
    }
}

const TextOrInput = React.forwardRef<React.ElementRef<typeof TextInput>, FormTextProps>((props, ref) => {
    const initialValue = lodash.get(props.formik.initialValues, props.name) as string | undefined
    return initialValue ? <GameText>{props.mask ? mask(initialValue, props.mask) : initialValue}</GameText> : <SignupInput {...props} ref={ref} />
})

export const BetFormComponent: React.FC<BetFormProps> = ({ formik }) => {
    const refs = new Array(3).map(([key, value]) => useRef<TextInput>(null))

    return (
        <View style={[{ gap: 15 }]}>
            <TextOrInput
                ref={refs[0]}
                formik={formik}
                name="nome"
                label={"Nome completo"}
                color={colors.secondary}
                onSubmitEditing={() => focusInput(1, refs)}
                disabled={!!formik.initialValues.nome}
            />
            <TextOrInput
                ref={refs[1]}
                formik={formik}
                name="cpf"
                label={"CPF"}
                color={colors.secondary}
                onSubmitEditing={() => focusInput(2, refs)}
                mask={"999.999.999-99"}
                disabled={!!formik.initialValues.cpf}
            />
            <TextOrInput
                ref={refs[2]}
                formik={formik}
                name="phone"
                label={"Telefone"}
                color={colors.secondary}
                onSubmitEditing={() => focusInput(2, refs)}
                mask={"(99) 9 9999-9999"}
                disabled={!!formik.initialValues.phone}
            />
        </View>
    )
}
