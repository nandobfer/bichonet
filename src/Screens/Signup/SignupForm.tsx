import { useFormik } from "formik"
import React, { useRef, useState } from "react"
import { View, TextInput as NTextInput } from "react-native"
import { UserForm } from "../../types/UserForm"
import { user_schema } from "../../schemas/user_schema"
import { Icon, Text, TextInput } from "react-native-paper"
import { ORIENTATION } from "../../tools/orientation"
import { colors } from "../../style/colors"
import { focusInput } from "../../tools/focusInput"
import { SignupInput } from "./SignupInput"
import { SignupButton } from "./SignupButton"
import { useLinkTo } from "@react-navigation/native"
import { HomeButton } from "../Home/HomeButton"
import { api } from "../../backend/api"
import unmask from "../../tools/unmask"

interface SignupFormProps {
    goBack?: () => void
}

export const SignupForm: React.FC<SignupFormProps> = ({ goBack }) => {
    const linkTo = useLinkTo()

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const formik = useFormik<UserForm>({
        initialValues: {
            name: "",
            password: "",
            confirm_password: "",
            phone: "",
        },
        async onSubmit(values, formikHelpers) {
            if (loading) return
            setLoading(true)

            try {
                const response = await api.post("/user", { ...values, phone: unmask(values.phone) })
                console.log(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        },
        validationSchema: user_schema,
        validateOnChange: false,
    })

    const input_refs = Object.entries(formik.values).map(([key, value]) => useRef<NTextInput>(null))

    return (
        // {/* <View style={[{ alignSelf: "center" }]}>
        //     <Icon
        //         size={ORIENTATION == "desktop" ? 300 : 200}
        //         source={"account-circle"}
        //         color={ORIENTATION == "desktop" ? colors.background : colors.secondary}
        //     />
        // </View> */}

        <View style={[{ gap: 20 }]}>
            <Text
                style={[
                    { fontWeight: "bold", fontSize: 24, textAlign: "center" },
                    ORIENTATION == "desktop" ? { color: colors.background } : { color: colors.secondary },
                ]}
            >
                Cadastrar
            </Text>
            <SignupInput formik={formik} name="name" label={"NOME"} ref={input_refs[0]} onSubmitEditing={() => focusInput(1, input_refs)} />
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
                onSubmitEditing={() => focusInput(3, input_refs)}
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
            <View style={[{ gap: 30, marginTop: 10 }]}>
                <HomeButton
                    buttonColor={ORIENTATION == "desktop" ? colors.background : colors.primary}
                    onPress={() => formik.handleSubmit()}
                    loading={loading}
                >
                    SALVAR
                </HomeButton>
                <HomeButton
                    mode="outlined"
                    buttonColor={ORIENTATION == "desktop" ? colors.secondary : colors.background}
                    textColor={ORIENTATION == "desktop" ? colors.background : colors.secondary}
                    style={{ borderColor: ORIENTATION == "desktop" ? colors.background : colors.secondary, borderRadius: 100 }}
                    onPress={goBack}
                >
                    VOLTAR
                </HomeButton>
            </View>
        </View>
    )
}
