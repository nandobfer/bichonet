import React, { useRef, useState } from "react"
import { View, TextInput as NTextInput } from "react-native"
import { SignupInput } from "../Signup/SignupInput"
import { useFormik } from "formik"
import { focusInput } from "../../tools/focusInput"
import { Text, TextInput } from "react-native-paper"
import { colors } from "../../style/colors"
import { HomeButton } from "./HomeButton"
import { DESKTOP } from "../../tools/orientation"
import { useLinkTo } from "@react-navigation/native"
import { LoginForm as LoginFormType } from "../../types/LoginForm"
import { api } from "../../backend/api"
import unmask from "../../tools/unmask"
import { AxiosError } from "axios"
import { useUser } from "../../hooks/useUser"
import { scale } from "../../tools/scale"

interface LoginContainerProps {
    goBack: () => void
}

export const LoginForm: React.FC<LoginContainerProps> = ({ goBack }) => {
    const linkTo = useLinkTo()

    const { onLogin } = useUser()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const formik = useFormik<LoginFormType>({
        initialValues: { username: "", password: "" },
        async onSubmit(values, formikHelpers) {
            if (loading) return
            setLoading(true)

            console.log(values)

            try {
                const response = await api.post("/auth", { ...values, username: unmask(values.username) })
                onLogin(response.data)
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
        <View style={[{ gap: scale(20) }]}>
            <Text
                style={[
                    { fontWeight: "bold", fontSize: scale(24), textAlign: "center" },
                    DESKTOP ? { color: colors.background } : { color: colors.secondary },
                ]}
            >
                Entrar
            </Text>
            <SignupInput
                formik={formik}
                name="username"
                label={"CELULAR"}
                keyboardType="phone-pad"
                maxLength={16}
                mask={"(99) 9 9999-9999"}
                ref={input_refs[0]}
                onSubmitEditing={() => focusInput(1, input_refs)}
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
                ref={input_refs[1]}
                onSubmitEditing={() => formik.handleSubmit()}
                returnKeyType="done"
            />

            <View style={[{ flexDirection: "row", gap: scale(30), marginTop: scale(10) }, DESKTOP && { justifyContent: "flex-end" }]}>
                <HomeButton
                    style={[
                        { borderColor: DESKTOP ? colors.background : colors.secondary, borderRadius: 100 },
                        DESKTOP && { flex: 0.25, minWidth: scale(150) },
                    ]}
                    mode="outlined"
                    buttonColor={DESKTOP ? colors.secondary : colors.background}
                    textColor={DESKTOP ? colors.background : colors.secondary}
                    onPress={goBack}
                >
                    VOLTAR
                </HomeButton>
                <HomeButton
                    style={[DESKTOP && { flex: 0.25, minWidth: scale(150) }]}
                    buttonColor={DESKTOP ? colors.background : colors.primary}
                    onPress={() => formik.handleSubmit()}
                    loading={loading}
                >
                    ENTRAR
                </HomeButton>
            </View>
        </View>
    )
}
