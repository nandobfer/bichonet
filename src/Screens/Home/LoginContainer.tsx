import React, { useRef, useState } from "react"
import { View, TextInput as NTextInput } from "react-native"
import { SignupInput } from "../Signup/SignupInput"
import { useFormik } from "formik"
import { focusInput } from "../../tools/focusInput"
import { TextInput } from "react-native-paper"
import { colors } from "../../style/colors"
import { HomeButton } from "./HomeButton"
import { ORIENTATION } from "../../tools/orientation"

interface LoginContainerProps {
    goBack: () => void
}

export const LoginContainer: React.FC<LoginContainerProps> = ({ goBack }) => {
    const [showPassword, setShowPassword] = useState(false)

    const formik = useFormik({
        initialValues: { phone: "", password: "" },
        async onSubmit(values, formikHelpers) {
            console.log(values)
        },
    })

    const input_refs = Object.entries(formik.values).map(([key, value]) => useRef<NTextInput>(null))

    return (
        <View style={[{ gap: 20 }]}>
            <SignupInput
                formik={formik}
                name="phone"
                label={"CELULAR"}
                keyboardType="phone-pad"
                maxLength={16}
                mask={"(99) 9 9999-9999"}
                ref={input_refs[1]}
                onSubmitEditing={() => focusInput(2, input_refs)}
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
                onSubmitEditing={() => formik.handleSubmit()}
                returnKeyType="done"
            />

            <View style={[{ flexDirection: "row", gap: 30, marginTop: 10 }, ORIENTATION == "desktop" && { justifyContent: "flex-end" }]}>
                <HomeButton style={[ORIENTATION == "desktop" && { flex: 0.2 }]} onPress={goBack}>
                    VOLTAR
                </HomeButton>
                <HomeButton style={[ORIENTATION == "desktop" && { flex: 0.2 }]} onPress={() => formik.handleSubmit()}>
                    ENTRAR
                </HomeButton>
            </View>
        </View>
    )
}
