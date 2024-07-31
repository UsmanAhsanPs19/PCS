import { Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import AppIcon from '../../../assets/AppIcon'

import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { GlbalLocale } from '../../constants/locale'
import CustomInput from '../../components/CustomInput'
import CustomButton from './components/CustomButton'
import { isLoading } from 'expo-font'
import { get_profile, login_url } from '../../constants/APIEndpoints'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getRequest, postRequest } from '../../helpers/APIRequest'
import Toast from 'react-native-toast-message'
import { useDispatch } from 'react-redux'
import { setAuth, setIsAuthorized } from '../../redux/AuthSlice'

export default function LoginScreen({ navigation }) {
    const dispatch = useDispatch();
    const [remeberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState(''); //wepidi4096@nolanzip.com
    const [password, setPassword] = useState(""); //Usman@786

    useEffect(() => {
        // Check if user credentials are saved and automatically log in if "Remember Me" is enabled
        const autoLogin = async () => {
            const savedCredentials = await AsyncStorage.getItem('credentials');
            if (savedCredentials) {
                const { email, password } = JSON.parse(savedCredentials);
                // Perform login using retrieved credentials
                // login(username, password);
                setEmail(email);
                setPassword(password);
                setRememberMe(true)
            }
        };
        autoLogin();
    }, [])

    // Validate email format
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    function validateData() {
        let isValid = true;
        let tempError = { ...errors };

        if (!validateEmail(email)) {
            tempError = { ...tempError, email: 'Invalid email address' };
            isValid = false;
        }
        if (!password.trim()) {
            tempError = { ...tempError, password: 'Password is required.' };
            isValid = false;
        }

        setErrors(tempError)
        return isValid;
    }


    async function getUserData(token) {
        return await getRequest(get_profile, token)
    }

    async function validateandSubmit() {
        setIsLoading(true);
        if (validateData()) {
            let data = new FormData();
            data.append('email', email);
            data.append('password', password);

            await postRequest(login_url, data, null).then(async response => {
                if (response.status) {
                    const _token = response.access_token;
                    await AsyncStorage.setItem('token', _token);
                    const data = await getUserData(_token);
                    if (data.status) {
                        dispatch(setAuth(data.data?.profile));
                        dispatch(setIsAuthorized(true));
                        Toast.show({
                            type: 'success',
                            text1: 'Login',
                            text2: response.message
                        });
                        navigation.replace('Dashboard')
                    }
                    else {
                        Toast.show({
                            type: 'error',
                            text1: 'Login',
                            text2: "Please try again later!!!"
                        });
                    }
                }
                else {
                    Toast.show({
                        type: 'error',
                        text1: 'Login',
                        text2: response.message
                    });
                }
                setIsLoading(false)
            }).catch(error => {
                console.log("Error:", error)
                setIsLoading(false)
            })
            if (remeberMe) {
                const credentials = JSON.stringify({ email, password });
                await AsyncStorage.setItem('credentials', credentials);
            }
        }
    }

    return (
        <View
            style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
            className="flex-1 items-center pt-20"
        >
            <StatusBar style={'light'} />
            {/* View for input fields & login button */}
            <View className="space-y-4 flex-1 z-10">
                <View className="self-center">
                    <AppIcon />
                </View>
                <View>
                    <Text
                        className={"my-4 text-lg font-medium space-y-2"}
                        style={{ color: THEME_COLORS.textColor, fontSize: hp(2.5), fontFamily: "Poppins-Medium" }}
                    >{GlbalLocale.signin}
                    </Text>
                </View>
                {/* Email Input */}
                <CustomInput
                    placeholder={GlbalLocale.email}
                    value={email}
                    setValue={setEmail}
                    name='email'
                    error={errors.email}
                    classes={"my-2"}
                />
                {/* Password Input */}
                <CustomInput
                    placeholder={GlbalLocale.password_placeholder}
                    value={password}
                    setValue={setPassword}
                    isSecured={true}
                    error={errors.password}
                    name='password'
                />
                {/* Forgot password & Remeber me section */}

                <View className="flex flex-row justify-between items-center">
                    {/* Remeber me section */}
                    <View
                        className="flex-row items-center space-x-2"
                    >
                        <Switch
                            trackColor={{ false: 'gray', true: THEME_COLORS.PRIMARY_COLOR }}
                            thumbColor={'white'}
                            onValueChange={() => setRememberMe(prev => !prev)}
                            value={remeberMe}
                        />
                        <Text
                            className={"text-lg font-medium space-y-2"}
                            style={{ color: THEME_COLORS.textColor, fontSize: hp(2), fontFamily: "Poppins-Medium" }}
                        >{GlbalLocale.remeber_me}
                        </Text>
                    </View>

                    {/* Forgoet text */}
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Forgot')
                        }}
                    >
                        <Text
                            className={"text-lg font-medium space-y-2"}
                            style={{ color: THEME_COLORS.textColor, fontSize: hp(2), fontFamily: "Poppins-Regular" }}
                        >{GlbalLocale.forgot_password}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Login button */}
                <View>
                    <CustomButton
                        text={GlbalLocale.signin}
                        isLoading={isLoading}
                        onClick={validateandSubmit}
                    />
                </View>
            </View>
            {/* View to show the signup text */}
            <View
                className="flex-row justify-center items-center mb-10 z-0"
            >
                <Text
                    className={"text-lg font-medium space-y-2"}
                    style={{ color: THEME_COLORS.textColor, fontSize: hp(2), fontFamily: "Poppins-Regular" }}
                >{GlbalLocale.dont_have_account}
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Signup")}
                >
                    <Text
                        className={"text-lg font-medium space-y-2"}
                        style={{ color: THEME_COLORS.PRIMARY_COLOR, fontSize: hp(2), fontFamily: "Poppins-Medium" }}
                    >{GlbalLocale.signup}!
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}