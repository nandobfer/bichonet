import React, { useRef, useState } from "react"
import { View, TextInput as NTextInput } from "react-native"
import { SignupInput } from "../Signup/SignupInput"
import { useFormik } from "formik"
import { focusInput } from "../../tools/focusInput"
import { Text, TextInput } from "react-native-paper"
import { colors } from "../../style/colors"
import { HomeButton } from "./HomeButton"
import { ORIENTATION } from "../../tools/orientation"
import { useLinkTo } from "@react-navigation/native"
import { LoginForm as LoginFormType } from "../../types/LoginForm"
import { api } from "../../backend/api"
import unmask from "../../tools/unmask"
import { AxiosError } from "axios"

interface LoginContainerProps {
    goBack: () => void
}

export const LoginForm: React.FC<LoginContainerProps> = ({ goBack }) => {
    const linkTo = useLinkTo()

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const formik = useFormik<LoginFormType>({
        initialValues: { phone: "", password: "" },
        async onSubmit(values, formikHelpers) {
            if (loading) return
            setLoading(true)

            console.log(values)

            try {
                const response = await api.post("/auth", { ...values, phone: unmask(values.phone) })
                console.log(response.data)
                // linkTo("/inicio")
            } catch (error) {
                console.log(error)
                if (error instanceof AxiosError && error.response?.status == 401) {
                    formik.setFieldError("password", "Telefone ou senha inválidos")
                    formik.setFieldError("phone", " ")
                }
            } finally {
                setLoading(false)
            }
        },
    })

    const input_refs = Object.entries(formik.values).map(([key, value]) => useRef<NTextInput>(null))

    return (
        <View style={[{ gap: 20 }]}>
            <Text
                style={[
                    { fontWeight: "bold", fontSize: 24, textAlign: "center" },
                    ORIENTATION == "desktop" ? { color: colors.background } : { color: colors.secondary },
                ]}
            >
                Entrar
            </Text>
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
                <HomeButton
                    style={[
                        { borderColor: ORIENTATION == "desktop" ? colors.background : colors.secondary, borderRadius: 100 },
                        ORIENTATION == "desktop" && { flex: 0.25, minWidth: 150 },
                    ]}
                    mode="outlined"
                    buttonColor={ORIENTATION == "desktop" ? colors.secondary : colors.background}
                    textColor={ORIENTATION == "desktop" ? colors.background : colors.secondary}
                    onPress={goBack}
                >
                    VOLTAR
                </HomeButton>
                <HomeButton
                    style={[ORIENTATION == "desktop" && { flex: 0.25, minWidth: 150 }]}
                    buttonColor={ORIENTATION == "desktop" ? colors.background : colors.primary}
                    onPress={() => formik.handleSubmit()}
                    loading={loading}
                >
                    ENTRAR
                </HomeButton>
            </View>
        </View>
    )
}
