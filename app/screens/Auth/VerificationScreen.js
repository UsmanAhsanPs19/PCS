import { Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'

import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { GlbalLocale } from '../../constants/locale'
import { OtpInput } from 'react-native-otp-entry';
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import CustomButton from './components/CustomButton'

export default function VerificationScreen({ navigation }) {
    let otpInput = useRef(null);
    const [otp, setOtp] = useState('');

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
                        className={"mb-4 text-lg font-medium"}
                        style={{ color: THEME_COLORS.textColor, fontSize: hp(2.5), fontFamily: "Poppins-Medium" }}
                    >{GlbalLocale.verification}
                    </Text>
                    <Text
                        className={"mb-4 text-lg font-medium"}
                        style={{ color: THEME_COLORS.textColor, fontSize: hp(2), fontFamily: "Poppins-Regular" }}
                    >{`We’ve send you the verification code on ahmed.dani96@gmail.com`}
                    </Text>
                </View>
                {/* Email Input */}
                <OtpInput ref={e => (otpInput = e)}
                    numberOfDigits={4}
                    keyboardType='numeric'
                    secureTextEntry={true}
                    autoFocus
                    focusColor={THEME_COLORS.PRIMARY_COLOR}
                    onTextChange={text => setOtp(text)}
                    theme={
                        {
                            pinCodeTextStyle: {
                                fontFamily: "Poppins-Regular"
                            }
                        }
                    }
                // inputCellLength={2}
                // containerStyle={{
                //     marginBottom: 20,
                //     backgroundColor: 'black'
                // }}
                // textInputStyle={{
                //     borderRadius: 10,
                //     borderWidth: 4,
                // }}
                ></OtpInput>

                {/* Login button */}
                <View>
                    <CustomButton
                        text={GlbalLocale.continue}
                        onClick={() => { }}
                    />
                </View>
            </View>
        </View>
    )
}