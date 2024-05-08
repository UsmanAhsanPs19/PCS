import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'

import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { GlbalLocale } from '../../constants/locale'
import CustomInput from '../../components/CustomInput'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import CustomButton from './components/CustomButton'

export default function SignupScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState('');
    const [confirm_email, setConfirmEmail] = useState('');
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    // Validate email format
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // Password length must be 6
    const validatePasswordLength = (password) => {
        return password.length >= 6;
    };

    //Check if full name contains any numbers
    const validateFullName = (fullName) => {
        const re = /\d/;
        return !re.test(fullName);
    };


    function clearError() {
        setErrors({})
    }

    const handleValidation = () => {
        let isValid = true;
        let tempError = { ...errors };

        if (username.trim() === "") {
            tempError = { ...tempError, username: 'Full name is required' };
            isValid = false;
        }

        if (!validateFullName(username)) {
            tempError = { ...tempError, username: 'Full name should not contain numbers' };
            isValid = false;
        }

        if (!validateEmail(email)) {
            tempError = { ...tempError, email: 'Invalid email address' };
            isValid = false;
        }

        if (!validatePasswordLength(password)) {
            tempError = { ...tempError, password: 'Password must be at least 6 characters long.' };
            isValid = false;
        }

        if (password !== confirm_password) {
            tempError = { ...tempError, confirm_password: 'Confirm Password must be matched with password.' };
            isValid = false;
        }
        setErrors(tempError)
        return isValid;
    }


    function validateAndSubmit() {
        clearError();
        setIsLoading(true);
        if (handleValidation()) {
            navigation.navigate('Verification')
            //API calling here

            setIsLoading(false)
        }
        setIsLoading(false)
    }

    return (
        <View
            style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
            className="flex-1 items-center pt-20"
        >
            <StatusBar style={'dark'} />
            {/* View for input fields & login button */}
            <ScrollView>
                <View className="space-y-4">
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
                        >{GlbalLocale.signup}
                        </Text>
                    </View>
                    {/* User name Input */}
                    <CustomInput
                        placeholder={GlbalLocale.fullname}
                        value={username}
                        setValue={setUsername}
                        name='username'
                        error={errors.username}
                        classes={"my-2"}
                    />
                    {/* Email Input */}
                    <CustomInput
                        placeholder={GlbalLocale.email}
                        value={email}
                        setValue={setEmail}
                        name='email'
                        error={errors.email}
                        classes={"my-2"}
                    />
                    {/* Email Input */}
                    {/* <CustomInput
                        placeholder={GlbalLocale.email}
                        value={confirm_email}
                        setValue={setConfirmEmail}
                        name='email'
                        error={errors.confirm_email}
                        classes={"my-2"}
                    /> */}
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

                    {/* Signup button */}
                    <View>
                        <CustomButton
                            text={GlbalLocale.signup}
                            onClick={validateAndSubmit}
                            isLoading={isLoading}
                        />
                    </View>
                </View>
            </ScrollView>
            {/* View to show the signup text */}
            <View
                className="flex-row justify-center items-center mb-3"
            >
                <Text
                    className={"text-lg font-medium space-y-2"}
                    style={{ color: THEME_COLORS.textColor, fontSize: hp(2), fontFamily: "Poppins-Regular" }}
                >{GlbalLocale.have_account}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Text
                        className={"text-lg font-medium space-y-2"}
                        style={{ color: THEME_COLORS.PRIMARY_COLOR, fontSize: hp(2), fontFamily: "Poppins-Medium" }}
                    >{GlbalLocale.signin}!
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}