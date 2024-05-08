import { View, Text } from 'react-native'
import React from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import HeaderOther from './components/HeaderOther'
import AppIcon from '../../../assets/AppIcon'
import { GlbalLocale } from '../../constants/locale'
import { CalendarIcon, EnvelopeIcon, GlobeAltIcon, MapPinIcon, PhoneIcon } from 'react-native-heroicons/solid'

export default function GeneralInformationScreen() {
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
                    <AppIcon />
                </View>
                <Text
                    className="px-5 py-3"
                    style={{
                        fontFamily: "Poppins-Regular",
                        color: THEME_COLORS.textColor
                    }}
                >
                    {GlbalLocale.eventName}
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
                                {GlbalLocale.eventDate}
                            </Text>
                            <Text
                                className="text-xs"
                                style={{
                                    fontFamily: "Poppins-Light",
                                    color: THEME_COLORS.TEXT_GRAY_TIME
                                }}
                            >
                                {GlbalLocale.eventTime}
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
                                {GlbalLocale.eventDate}
                            </Text>
                            <Text
                                className="text-xs"
                                style={{
                                    fontFamily: "Poppins-Light",
                                    color: THEME_COLORS.TEXT_GRAY_TIME
                                }}
                            >
                                {GlbalLocale.eventTime}
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
                        <View>
                            <Text
                                className="text-xs"
                                style={{
                                    fontFamily: "Poppins-Regular",
                                    color: THEME_COLORS.TEXT_LIGHT_BLACK
                                }}
                            >
                                {GlbalLocale.contactNumbers}
                            </Text>
                        </View>
                    </View>
                    <View className="bg-white mt-0.5 p-4 flex-row space-x-2 items-center">
                        <EnvelopeIcon color={THEME_COLORS.TEXT_LIGHT_BLACK} />
                        <View>
                            <Text
                                className="text-xs"
                                style={{
                                    fontFamily: "Poppins-Regular",
                                    color: THEME_COLORS.TEXT_LIGHT_BLACK
                                }}
                            >
                                {GlbalLocale.eventEmail}
                            </Text>
                        </View>
                    </View>
                    <View className="bg-white mt-0.5 p-4 flex-row space-x-2 items-center">
                        <GlobeAltIcon color={THEME_COLORS.TEXT_LIGHT_BLACK} />
                        <View>
                            <Text
                                className="text-xs"
                                style={{
                                    fontFamily: "Poppins-Regular",
                                    color: THEME_COLORS.TEXT_LIGHT_BLACK
                                }}
                            >
                                {GlbalLocale.eventWebLink}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}