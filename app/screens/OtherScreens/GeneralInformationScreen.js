import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import HeaderOther from './components/HeaderOther'
import AppIcon from '../../../assets/AppIcon'
import { GlbalLocale } from '../../constants/locale'
import { CalendarIcon, EnvelopeIcon, GlobeAltIcon, MapPinIcon, PhoneIcon } from 'react-native-heroicons/solid'
import { general_information } from '../../constants/APIEndpoints'
import { getRequest } from '../../helpers/APIRequest'
import HandleAction from '../../components/HandleAction'

export default function GeneralInformationScreen({ navigation }) {

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getInformation()
    }, [])

    // Get information
    async function getInformation() {
        setIsLoading(true);
        await getRequest(general_information).then(response => {
            console.log("General Information Data::", JSON.stringify(response))
            if (response.status && response.data) {
                setData(response.data)
            }
            setIsLoading(false)
        }).catch(error => {
            console.log("general Information Error:::", error)
            setIsLoading(false)
        })
    }

    return (
        <View
            style={{ backgroundColor: THEME_COLORS.PRIMARY_COLOR_DARK }}
            className="pt-12 flex-1"
        >
            <StatusBar style='light' />
            <HeaderOther label='General Information'
                bg={THEME_COLORS.PRIMARY_COLOR_DARK}
                text_color={"white"}
                color_arrow='white'
                classes="px-4 py-3" showBack onPress={() => navigation.goBack()} />
            {/* Details of schedule */}
            <View className="flex-1"
                style={{
                    backgroundColor: THEME_COLORS.BG_DASHBOARD
                }}
            >
                {/* App icon */}
                <View className="bg-white items-center justify-center p-4">
                    {/* <Image
                        className="rounded-xl"
                        resizeMode='contain'
                        style={{
                            height: hp(15),
                            width: wp('70%')
                        }}
                        source={{ uri: `${data?.logo}` }}
                    /> */}
                    <AppIcon />
                </View>
                <Text
                    className="px-5 py-3"
                    style={{
                        fontFamily: "Poppins-Regular",
                        color: THEME_COLORS.textColor
                    }}
                >
                    {data?.title}
                </Text>
                <View>
                    <View className="bg-white p-4 flex-row space-x-2 items-center">
                        <CalendarIcon color={THEME_COLORS.TEXT_LIGHT_BLACK} />
                        <View>
                            <Text
                                className="text-xs"
                                style={{
                                    fontFamily: "Poppins-Regular",
                                    color: THEME_COLORS.TEXT_LIGHT_BLACK
                                }}
                            >
                                {data?.date}
                            </Text>
                            <Text
                                className="text-xs"
                                style={{
                                    fontFamily: "Poppins-Light",
                                    color: THEME_COLORS.TEXT_GRAY_TIME
                                }}
                            >
                                {data?.time}
                            </Text>
                        </View>
                    </View>
                    <View className="bg-white mt-0.5 p-4 flex-row space-x-2 items-center">
                        <MapPinIcon color={THEME_COLORS.TEXT_LIGHT_BLACK} />
                        <View>
                            <Text
                                className="text-xs"
                                style={{
                                    fontFamily: "Poppins-Regular",
                                    color: THEME_COLORS.TEXT_LIGHT_BLACK
                                }}
                            >
                                {data?.location}
                            </Text>
                        </View>
                    </View>
                </View>
                <Text
                    className="px-5 py-3"
                    style={{
                        fontFamily: "Poppins-Regular",
                        color: THEME_COLORS.GRAY_TEXT
                    }}
                >
                    {GlbalLocale.contactUs}
                </Text>
                <View>
                    <View className="bg-white p-4 flex-row space-x-2 items-center">
                        <PhoneIcon color={THEME_COLORS.TEXT_LIGHT_BLACK} />
                        <View className="flex flex-row items-center justify-start">
                            <TouchableOpacity onPress={() => HandleAction('phone', data?.contact_us)}>
                                <Text
                                    className="text-xs"
                                    style={{
                                        fontFamily: "Poppins-Regular",
                                        color: THEME_COLORS.TEXT_LIGHT_BLACK
                                    }}
                                >
                                    {data?.contact_us}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => HandleAction('phone', data?.contact_us_two)}>
                                <Text
                                    className="text-xs"
                                    style={{
                                        fontFamily: "Poppins-Regular",
                                        color: THEME_COLORS.TEXT_LIGHT_BLACK
                                    }}
                                >
                                    {data?.contact_us_two}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="bg-white mt-0.5 p-4 flex-row space-x-2 items-center">
                        <EnvelopeIcon color={THEME_COLORS.TEXT_LIGHT_BLACK} />
                        <TouchableOpacity onPress={() => HandleAction('email', data?.email)}>
                            <Text
                                className="text-xs"
                                style={{
                                    fontFamily: "Poppins-Regular",
                                    color: THEME_COLORS.TEXT_LIGHT_BLACK
                                }}
                            >
                                {data?.email}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className="bg-white mt-0.5 p-4 flex-row space-x-2 items-center">
                        <GlobeAltIcon color={THEME_COLORS.TEXT_LIGHT_BLACK} />
                        <TouchableOpacity onPress={() => HandleAction('website', `https://${data?.website}`)}>
                            <Text
                                className="text-xs"
                                style={{
                                    fontFamily: "Poppins-Regular",
                                    color: THEME_COLORS.TEXT_LIGHT_BLACK
                                }}
                            >
                                {data?.website}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}