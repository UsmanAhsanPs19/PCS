import { Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import AppIcon from '../../../assets/AppIcon'

import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { GlbalLocale } from '../../constants/locale'
import CustomInput from '../../components/CustomInput'
import CustomButton from './components/CustomButton'

export default function LoginScreen({ navigation }) {
    const [remeberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");

    return (
        <View
            style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
            className="flex-1 items-center pt-20"
        >
            <StatusBar style={'light'} />
            {/* View for input fields & login button */}
            <View className="space-y-4 flex-1">
                <AppIcon />
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
                    classes={"my-2"}
                />
                {/* Password Input */}
                <CustomInput
                    placeholder={GlbalLocale.password_placeholder}
                    value={password}
                    setValue={setPassword}
                    isSecured={true}
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
                        onClick={() => {
                            navigation.replace('Dashboard')
                        }}
                    />
                </View>
            </View>
            {/* View to show the signup text */}
            <View
                className="flex-row justify-center items-center mb-3"
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