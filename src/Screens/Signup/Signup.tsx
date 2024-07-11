import React, { useRef, useState } from "react"
import { ScrollView, View, TextInput as NTextInput } from "react-native"
import { colors } from "../../style/colors"
import { Icon, TextInput } from "react-native-paper"
import { useFormik } from "formik"
import { UserForm } from "../../types/UserForm"
import { user_schema } from "../../schemas/user_schema"
import { SignupInput } from "./SignupInput"
import { SignupButton } from "./SignupButton"

interface SignupProps {}

export const Signup: React.FC<SignupProps> = ({}) => {
    const [showPassword, setShowPassword] = useState(false)

    const formik = useFormik<UserForm>({
        initialValues: {
            name: "",
            password: "",
            confirm_password: "",
            phone: "",
        },
        async onSubmit(values, formikHelpers) {
            console.log(values)
        },
        validationSchema: user_schema,
        validateOnChange: false,
    })

    const input_refs = Object.entries(formik.values).map(([key, value]) => useRef<NTextInput>(null))

    const focusInput = (index: number) => {
        const ref = input_refs[index].current

        if (ref) {
            try {
                // @ts-ignore
                ref.focus()
            } catch (error) {}
        }
    }

    return (
        <ScrollView
            contentContainerStyle={[{ padding: 50, gap: 30 }]}
            style={{ flex: 1, backgroundColor: colors.background }}
            keyboardShouldPersistTaps="handled"
        >
            <View style={[{ alignSelf: "center" }]}>
                <Icon size={200} source={"account-circle"} color={colors.secondary} />
            </View>

            <View style={[{ gap: 20 }]}>
                <SignupInput formik={formik} name="name" label={"NOME"} ref={input_refs[0]} onSubmitEditing={() => focusInput(1)} />
                <SignupInput
                    formik={formik}
                    name="phone"
                    label={"CELULAR"}
                    keyboardType="phone-pad"
                    maxLength={16}
                    mask={"(99) 9 9999-9999"}
                    ref={input_refs[1]}
                    onSubmitEditing={() => focusInput(2)}
                />
                <SignupInput
                    formik={formik}
                    name="password"
                    label={"SENHA"}
                    secureTextEntry={!showPassword}
                    right={
                        <TextInput.Icon
                            icon={showPassword ? "eye-off" : "eye"}
                            color={colors.background}
                            onPress={() => setShowPassword((value) => !value)}
                        />
                    }
                    ref={input_refs[2]}
                    onSubmitEditing={() => focusInput(3)}
                />
                <SignupInput
                    formik={formik}
                    name="confirm_password"
                    label={"CONFIRMAR SENHA"}
                    secureTextEntry={!showPassword}
                    right={
                        <TextInput.Icon
                            icon={showPassword ? "eye-off" : "eye"}
                            color={colors.background}
                            onPress={() => setShowPassword((value) => !value)}
                        />
                    }
                    ref={input_refs[3]}
                    onSubmitEditing={() => formik.handleSubmit()}
                    returnKeyType="done"
                />
            </View>

            <SignupButton onPress={() => formik.handleSubmit()}>SALVAR</SignupButton>
        </ScrollView>
    )
}
