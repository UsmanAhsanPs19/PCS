import { Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'

import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { GlbalLocale } from '../../constants/locale'
import { OtpInput } from 'react-native-otp-entry';
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import CustomButton from './components/CustomButton'
import { resend_otp_url, verify_otp_url } from '../../constants/APIEndpoints'
import { postRequest } from '../../helpers/APIRequest'
import Toast from 'react-native-toast-message'

export default function VerificationScreen({ navigation, route }) {
    let otpInput = useRef(null);
    const email = route?.params?.email;
    const [seconds, setSeconds] = useState(90);
    const [otp, setOtp] = useState('');
    const [isOtpLoading, setIsOtpLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [enable_resend, setEnableResend] = useState(false)

    useEffect(() => {
        if (!enable_resend) {
            const timer = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);

            // Clear interval when component unmounts or when seconds reach 0
            return () => clearInterval(timer);
        }
    }, [enable_resend]);

    useEffect(() => {
        // Reset timer when seconds reach 0
        if (seconds === 0) {
            // Handle timer expiration
            // For example, display a message or trigger an action
            setEnableResend(true);
            setSeconds(90)
        }
    }, [seconds]);

    // Convert seconds to mm:ss format
    const formatTime = () => {
        const mm = Math.floor(seconds / 60).toString().padStart(2, '0');
        const ss = (seconds % 60).toString().padStart(2, '0');
        return `${mm}:${ss}`;
    };

    async function sendOtp() {
        setIsOtpLoading(true);
        let data = new FormData();
        data.append('email', email);
        setOtp("")
        await postRequest(resend_otp_url, data, null).then(async response => {
            console.log("Response:::", response)
            if (response.status) {
                Toast.show({
                    type: 'success',
                    text1: 'Resend OTP',
                    text2: response.message
                });
                setEnableResend(false)
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Resend OTP',
                    text2: response.message
                });
            } setIsOtpLoading(false)
        }).catch(error => {
            setEnableResend(false)
            console.log("Error:", error.response?.data)
            setIsOtpLoading(false)
        })
    }

    async function verifyOTP() {
        setIsLoading(true);
        let data = new FormData();
        data.append('email', email);
        data.append('code', otp.trim());

        await postRequest(verify_otp_url, data, null).then(async response => {
            console.log("Response:::", response)
            if (response.status) {
                Toast.show({
                    type: 'success',
                    text1: 'Verify OTP',
                    text2: response.message
                });
                navigation.navigate({ name: "ChangePassword", params: { email } })
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Verify OTP',
                    text2: response.message
                });
            } setIsLoading(false)
            // navigation.replace({name: ""})
        }).catch(error => {
            console.log("Error:", error)
            setIsLoading(false)
        })
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
                        className={"mb-4 text-lg font-medium"}
                        style={{ color: THEME_COLORS.textColor, fontSize: hp(2.5), fontFamily: "Poppins-Medium" }}
                    >{GlbalLocale.verification}
                    </Text>
                    <Text
                        className={"mb-4 text-lg font-medium"}
                        style={{ color: THEME_COLORS.textColor, fontSize: hp(2), fontFamily: "Poppins-Regular" }}
                    >{`We’ve send you the verification code on ${email}`}
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
                ></OtpInput>

                {/* Continue button */}
                <View>
                    <CustomButton
                        text={GlbalLocale.continue}
                        isLoading={isLoading}
                        disabled={otp.length < 4}
                        onClick={verifyOTP}
                    />
                </View>
                <View className="flex-row justify-center items-center">
                    {!enable_resend && <><Text
                        className={"text-lg font-medium space-y-2"}
                        style={{ color: THEME_COLORS.textColor, fontSize: hp(2), fontFamily: "Poppins-Medium" }}
                    >Re-send code in{" "}
                    </Text>
                        <Text
                            className={"text-lg font-medium space-y-2"}
                            style={{ color: THEME_COLORS.PRIMARY_COLOR, fontSize: hp(2), fontFamily: "Poppins-Medium" }}
                        >{formatTime()}
                        </Text></>}
                    {enable_resend && <TouchableOpacity
                        onPress={sendOtp}
                    >
                        <Text
                            className={"text-lg font-medium space-y-2 underline"}
                            style={{ color: THEME_COLORS.textColor, fontSize: hp(2), fontFamily: "Poppins-Medium" }}
                        >Resend OTP
                        </Text>
                    </TouchableOpacity>}
                </View>
            </View>
        </View>
    )
}