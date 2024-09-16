import { View, Text, Image } from 'react-native'
import React from 'react'
import HeaderOther from '../OtherScreens/components/HeaderOther'
import { StatusBar } from 'expo-status-bar'
import { THEME_COLORS } from '../../constants/colors'
import { GlbalLocale } from '../../constants/locale'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function EntryUserDetails({ navigation, route }) {
    const { data, label } = route?.params || {};
    return (
        <View
            style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
            className="flex-1 pt-10"
        >
            <StatusBar style='dark' />
            <View className="space-y-4 px-4 h-5/6">
                {/* Header for other Screens */}
                <View>
                    <HeaderOther
                        showBack={true}
                        onPress={() => {
                            navigation.goBack()
                        }}

                        label={label}
                    />
                </View>

                <View style={{}}>
                    <Image
                        className="bg-black rounded-lg mb-3 self-center"
                        style={{
                            width: wp('70%'),
                            height: hp('35%')
                        }}
                        source={
                            // require("../../../assets/d1.png")
                            {
                                uri: (`${data?.profile_picture}`)
                            }
                        }
                    />
                    <View style={{
                        width: wp('80%'),
                        alignSelf: "center",
                        marginTop: hp(2.5)
                    }}>
                        <Text
                            className="mt-2 text-base text-left"
                            // numberOfLines={1}
                            ellipsizeMode='middle'
                            style={{
                                fontFamily: "Poppins-Medium",
                                color: THEME_COLORS.textColor
                            }}
                        >{`Name: ${data?.first_name || ""} ${data?.second_name || ""}`}</Text>
                        <Text
                            className="mt-1 text-base text-left"
                            // numberOfLines={1}
                            ellipsizeMode='middle'
                            style={{
                                fontFamily: "Poppins-Medium",
                                color: THEME_COLORS.textColor
                            }}
                        >{`CNIC: ${data?.cnic || ""}`}</Text>
                        <Text
                            className="mt-1 text-base text-left"
                            // numberOfLines={1}
                            ellipsizeMode='middle'
                            style={{
                                fontFamily: "Poppins-Medium",
                                color: THEME_COLORS.textColor
                            }}
                        >{`Number: ${data?.phone_number || ""}`}</Text>
                        {data?.registration_type === ("Doctor" || "Nurse") && <Text
                            className="mt-1 text-base text-left"
                            // numberOfLines={1}
                            ellipsizeMode='middle'
                            style={{
                                fontFamily: "Poppins-Medium",
                                color: THEME_COLORS.textColor
                            }}
                        >{`${data?.registration_type === "Doctor" ? "PMDC" : "PMNC"}: ${data?.registration_type === "Doctor" ? data?.pmdc : data?.nurse_number}`}</Text>}
                        <Text
                            className="mt-1 text-base text-left"
                            // numberOfLines={1}
                            ellipsizeMode='middle'
                            style={{
                                fontFamily: "Poppins-Medium",
                                color: THEME_COLORS.textColor
                            }}
                        >{`Registration Type: ${data?.registration_type || ""}`}</Text>
                        <View
                            style={{
                                height: hp(0.2),
                                marginVertical: hp(2),
                                backgroundColor: THEME_COLORS.PRIMARY_COLOR
                            }}
                        />
                        <Text
                            className="mt-1 text-base text-left"
                            // numberOfLines={1}
                            ellipsizeMode='middle'
                            style={{
                                fontFamily: "Poppins-Medium",
                                color: THEME_COLORS.textColor
                            }}
                        >{`Payment Type: ${data?.payment_type}`}</Text>
                        {data?.payment_type === "Promo Code" && <Text
                            className="mt-1 text-base text-left"
                            // numberOfLines={1}
                            ellipsizeMode='middle'
                            style={{
                                fontFamily: "Poppins-Medium",
                                color: THEME_COLORS.textColor
                            }}
                        >{`Promo Code: ${data?.promo_code || ""}`}</Text>}
                    </View>
                </View>
            </View>

        </View>
    )
}