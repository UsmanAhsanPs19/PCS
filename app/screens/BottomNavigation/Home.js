import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { StatusBar } from 'expo-status-bar'
import { GlbalLocale } from '../../constants/locale'
import HomeHeader from './components/header'
import { navigation_section_data, pcs_portal_data, speakers_data } from '../../constants/data'
export default function HomeScreen() {

    return (
        <View className="flex-1" style={{ backgroundColor: THEME_COLORS.BG_DASHBOARD }}>
            <StatusBar style='light' />
            <HomeHeader />
            <ScrollView>
                {/* Content of page section */}
                <View className="px-3 space-y-1">

                    {/* Held date section */}
                    <View className="">
                        <Text className="text-base my-1 text-center"
                            style={{
                                color: THEME_COLORS.GRAY_TEXT,
                                fontFamily: "Poppins-Medium"
                            }}
                        >Nov 11, 2024 - Nov 13, 2024</Text>
                        <Text className="text-xs text-center"
                            style={{
                                color: THEME_COLORS.GRAY_TEXT,
                                fontFamily: "Poppins-Regular"
                            }}
                        >Pearl Continental Hotel, Lahore</Text>
                    </View>

                    {/* PC portal all components */}
                    <View>
                        {/* PCS Portal section */}
                        <View className="my-2 flex-row justify-between items-center">
                            <Text
                                className={"text-xl font-medium"}
                                style={{ color: THEME_COLORS.textColor, fontFamily: "Poppins-Medium" }}
                            >{GlbalLocale.pcs_portal}
                            </Text>
                            <Text
                                className={""}
                                style={{ fontSize: hp(1.5), color: THEME_COLORS.PRIMARY_DARK, fontFamily: "Poppins-SemiBold" }}
                            >See all
                            </Text>
                        </View>
                        {/* Portal section after login */}
                        <View className="mx-1 space-y-2">
                            {/* Row 1 */}
                            <View className=" flex-row items-center justify-center space-x-3">
                                {pcs_portal_data.firstData.map(d => (<View
                                    style={{
                                        elevation: 3,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 3 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 3,
                                        height: hp('10%')
                                    }}
                                    className=" w-1/3 flex-1 p-3 bg-white items-center justify-center rounded-xl">
                                    {d.icon}
                                    <Text className="text-center mt-1"
                                        style={{
                                            color: THEME_COLORS.textColor,
                                            fontFamily: "Poppins-Medium",
                                            fontSize: hp(1)
                                        }}>{d.text}</Text>
                                    {d.isEditable && <Text className="py-0.5 px-2 rounded-full text-center"
                                        style={{
                                            color: "white",
                                            fontFamily: "Poppins-Medium",
                                            fontSize: hp(0.8),
                                            backgroundColor: THEME_COLORS.PRIMARY_COLOR
                                        }}>Edit Submission</Text>}
                                </View>))}
                            </View>
                            {/* Row 2 */}
                            <View className="w-full flex-row items-center justify-center space-x-3">
                                {pcs_portal_data.secondData.map(d => (<View
                                    style={{
                                        elevation: 3,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 3 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 3,
                                        height: hp('10%')
                                    }}
                                    className="w-1/3 flex-1 p-3 bg-white items-center justify-center rounded-xl">
                                    {d.icon}
                                    <Text className="text-center mt-1"
                                        style={{
                                            color: THEME_COLORS.textColor,
                                            fontFamily: "Poppins-Medium",
                                            fontSize: hp(1)
                                        }}>{d.text}</Text>
                                    {d.isEditable && <Text className="py-0.5 px-2 rounded-full text-center"
                                        style={{
                                            color: "white",
                                            fontFamily: "Poppins-Medium",
                                            fontSize: hp(0.8),
                                            backgroundColor: THEME_COLORS.PRIMARY_COLOR
                                        }}>Edit Submission</Text>}
                                </View>))}
                            </View>
                        </View>
                    </View>

                    {/* Navigation section */}
                    <View>
                        {/* Navigation header */}
                        <View className="my-2 flex-row justify-between items-center">
                            <Text
                                className={"text-xl font-medium"}
                                style={{ color: THEME_COLORS.textColor, fontFamily: "Poppins-Medium" }}
                            >{GlbalLocale.navigation_label}
                            </Text>
                            <Text
                                className={""}
                                style={{ fontSize: hp(1.5), color: THEME_COLORS.PRIMARY_DARK, fontFamily: "Poppins-SemiBold" }}
                            >See all
                            </Text>
                        </View>
                        {/* Navigation Container Content */}
                        <View className="mx-1 space-y-2">
                            {/* Row 1 */}
                            <View className=" flex-row items-center justify-center space-x-2">
                                {navigation_section_data.firstData.map(d => (<View
                                    style={{
                                        height: hp('12%'),
                                        backgroundColor: THEME_COLORS.PRIMARY_COLOR_DARK
                                    }}
                                    className="w-1/2 flex-1 p-3 bg-white items-center justify-center rounded-xl">
                                    {d.icon}
                                    <Text className="text-center mt-1"
                                        style={{
                                            color: "white",
                                            fontFamily: "Poppins-Medium",
                                        }}>{d.text}</Text>
                                </View>))}
                            </View>
                            {/* Row 2 */}
                            <View className=" flex-row items-center justify-center space-x-2">
                                {navigation_section_data.secondData.map(d => (<View
                                    style={{
                                        height: hp('12%'),
                                        backgroundColor: THEME_COLORS.PRIMARY_COLOR_DARK
                                    }}
                                    className="w-1/2 flex-1 p-3 bg-white items-center justify-center rounded-xl">
                                    {d.icon}
                                    <Text className="text-center mt-1"
                                        style={{
                                            color: "white",
                                            fontFamily: "Poppins-Medium",
                                        }}>{d.text}</Text>
                                </View>))}
                            </View>
                        </View>

                    </View>

                    {/* Speakers section */}
                    <View>
                        {/* Speakers header */}
                        <View className="my-2 flex-row justify-between items-center">
                            <Text
                                className={"text-xl font-medium"}
                                style={{ color: THEME_COLORS.textColor, fontFamily: "Poppins-Medium" }}
                            >{GlbalLocale.speakers_label}
                            </Text>
                            <Text
                                className={""}
                                style={{ fontSize: hp(1.5), color: THEME_COLORS.PRIMARY_DARK, fontFamily: "Poppins-SemiBold" }}
                            >See all
                            </Text>
                        </View>
                        {/* Speakers Container Content */}
                        <View className="mx-1 space-y-2">
                            {/* Row 1 */}
                            <View className=" flex-row items-center justify-center space-x-2">
                                {speakers_data.firstData.map(d => (<View
                                    style={{
                                        height: hp('8%'),
                                        backgroundColor: THEME_COLORS.PRIMARY_COLOR_DARK
                                    }}
                                    className="w-1/2 flex-row bg-white items-center justify-center rounded-xl">
                                    <Image
                                        className="rounded-lg"
                                        style={{ height: "100%" }}
                                        source={d.image}
                                    />
                                    <View className="px-1 flex-1">
                                        <Text className="text-center"
                                            numberOfLines={1}
                                            style={{
                                                color: "white",
                                                fontSize: hp(1.3),
                                                fontFamily: "Poppins-SemiBold",
                                            }}>{d.name}</Text>
                                        <Text className="text-center"
                                            numberOfLines={2}
                                            style={{
                                                color: "white",
                                                fontFamily: "Poppins-Regular",
                                                fontSize: hp(0.9)
                                            }}>{d.designation}</Text>
                                    </View>
                                </View>))}
                            </View>
                            {/* Row 2 */}
                            <View className=" flex-row items-center justify-center space-x-2">
                                {speakers_data.secondData.map(d => (<View
                                    style={{
                                        height: hp('8%'),
                                        backgroundColor: THEME_COLORS.PRIMARY_COLOR_DARK
                                    }}
                                    className="w-1/2 flex-row bg-white items-center justify-center rounded-xl">
                                    <Image
                                        className="rounded-lg"
                                        style={{ height: "100%", }}
                                        source={d.image}
                                    />
                                    <View className="px-1 flex-1">
                                        <Text className="text-center"
                                            numberOfLines={1}
                                            style={{
                                                color: "white",
                                                fontSize: hp(1.3),
                                                fontFamily: "Poppins-SemiBold",
                                            }}>{d.name}</Text>
                                        <Text className="text-center"
                                            numberOfLines={2}
                                            style={{
                                                color: "white",
                                                fontFamily: "Poppins-Regular",
                                                fontSize: hp(0.9)
                                            }}>{d.designation}</Text>
                                    </View>
                                </View>))}
                            </View>
                        </View>

                    </View>

                    {/* Sponsers section */}
                    <View>
                        {/* Sponsers header */}
                        <View className="my-2 flex-row justify-between items-center">
                            <Text
                                className={"text-xl font-medium"}
                                style={{ color: THEME_COLORS.textColor, fontFamily: "Poppins-Medium" }}
                            >{GlbalLocale.sponsers_label}
                            </Text>
                            <Text
                                className={""}
                                style={{ fontSize: hp(1.5), color: THEME_COLORS.PRIMARY_DARK, fontFamily: "Poppins-SemiBold" }}
                            >See all
                            </Text>
                        </View>

                        {/* Sponsers content */}
                        <View></View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}