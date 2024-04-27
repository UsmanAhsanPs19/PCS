import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'

import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { GlbalLocale } from '../../constants/locale'
import CustomInput from '../../components/CustomInput'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import CustomButton from './components/CustomButton'

export default function ResetPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');

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
                    >{GlbalLocale.reset_password}
                    </Text>
                    <Text
                        className={"mb-4 text-lg font-medium"}
                        style={{ color: THEME_COLORS.textColor, fontSize: hp(2), fontFamily: "Poppins-Regular" }}
                    >{`Please enter your email address to request a password reset`}
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

                {/* Login button */}
                <View>
                    <CustomButton
                        text={GlbalLocale.send}
                        onClick={() => { }}
                    />
                </View>
            </View>
        </View>
    )
}