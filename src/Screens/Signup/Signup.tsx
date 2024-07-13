import React, { useRef, useState } from "react"
import { ScrollView, View } from "react-native"
import { colors } from "../../style/colors"
import { Icon, TextInput } from "react-native-paper"
import { useFormik } from "formik"
import { UserForm } from "../../types/UserForm"
import { user_schema } from "../../schemas/user_schema"
import { SignupInput } from "./SignupInput"
import { SignupButton } from "./SignupButton"
import { useLinkTo } from "@react-navigation/native"
import { ORIENTATION } from "../../tools/orientation"
import { SignupForm } from "./SignupForm"

interface SignupProps {}

export const Signup: React.FC<SignupProps> = ({}) => {
    return (
        <ScrollView
            contentContainerStyle={[{ padding: 50, gap: 30 }]}
            style={[{ flex: 1, backgroundColor: colors.background }, ORIENTATION == "desktop" && { paddingHorizontal: 500 }]}
            keyboardShouldPersistTaps="handled"
        >
            <SignupForm />
        </ScrollView>
    )
}
