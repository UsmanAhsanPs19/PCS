import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'

import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { GlbalLocale } from '../../constants/locale'
import CustomInput from '../../components/CustomInput'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import CustomButton from './components/CustomButton'
import Toast from 'react-native-toast-message'
import { postRequest } from '../../helpers/APIRequest'
import { change_forgot_password_url } from '../../constants/APIEndpoints'

export default function ChangeForgotPassword({ navigation, route }) {
    const email = route?.params?.email
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [confirm_password, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    // Password length must be 6
    const validatePasswordLength = (password) => {
        return password.length >= 6;
    };

    function validateData() {
        let isValid = true;
        let tempError = { ...errors };

        if (!validatePasswordLength(password.trim())) {
            tempError = { ...tempError, password: 'Password must be at least 6 characters long.' };
            isValid = false;
        }

        if (password.trim() !== confirm_password.trim()) {
            tempError = { ...tempError, confirm_password: 'Confirm Password must be matched with password.' };
            isValid = false;
        }
        setErrors(tempError)
        return isValid;
    }

    async function validateandSubmit() {
        setIsLoading(true);
        if (validateData()) {
            let data = new FormData();
            data.append('email', email);
            data.append('new_password', password.trim());

            await postRequest(change_forgot_password_url, data, null).then(async response => {
                if (response.status) {
                    Toast.show({
                        type: 'success',
                        text1: 'Change Password',
                        text2: response.message
                    });
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });
                }
                else {
                    Toast.show({
                        type: 'error',
                        text1: 'Change Password',
                        text2: response.message
                    });
                }
                setIsLoading(false)
            }).catch(error => {
                console.log("Error:", error.response?.data)
                setIsLoading(false)
            })
        }
    }

    return (
        <View
            style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
            className="flex-1 items-center pt-20"
        >
            <StatusBar style={'light'} />
            {/* View for input fields & login button */}
            <View className="space-y-4 flex-1">
                <ArrowLeftIcon
                    onPress={() => {
                        navigation.goBack()
                    }}
                    size={hp(3)}
                    color={THEME_COLORS.textColor}
                />
                <View>
                    <Text
                        className={"mb-4 text-lg font-medium space-y-2"}
                        style={{ color: THEME_COLORS.textColor, fontSize: hp(2.5), fontFamily: "Poppins-Medium" }}
                    >{GlbalLocale.set_new_password}
                    </Text>
                    <Text
                        className={"mb-4 text-lg font-medium"}
                        style={{ color: THEME_COLORS.textColor, fontSize: hp(2), fontFamily: "Poppins-Regular" }}
                    >{`Please enter your new Password`}
                    </Text>
                </View>
                {/* Password Input */}
                <CustomInput
                    placeholder={GlbalLocale.password_placeholder}
                    value={password}
                    setValue={setPassword}
                    isSecured={true}
                    name='password'
                    error={errors.password}
                    classes={"my-2"}
                />

                {/* Password Input */}
                <CustomInput
                    placeholder={GlbalLocale.confirm_password}
                    value={confirm_password}
                    setValue={setConfirmPassword}
                    isSecured={true}
                    name='password'
                    error={errors.confirm_password}
                    classes={"my-2"}
                />

                {/* Login button */}
                <View>
                    <CustomButton
                        isLoading={isLoading}
                        text={GlbalLocale.send}
                        onClick={validateandSubmit}
                    />
                </View>
            </View>
        </View>
    )
}