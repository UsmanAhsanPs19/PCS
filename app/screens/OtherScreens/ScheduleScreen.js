import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HeaderOther from './components/HeaderOther'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { THEME_COLORS } from '../../constants/colors'

export default function ScheduleScreen({ navigation }) {
    const [selected_index, set_selected_index] = useState(0)
    const eventDates = ["FRI, 11 Nov 2024", "SAT, 12 Nov 2024", "SUN, 13 Nov 2024"]

    return (
        <View
            style={{ backgroundColor: THEME_COLORS.PRIMARY_COLOR_DARK }}
            className="pt-12 flex-1"
        >
            <StatusBar style='light' />
            <HeaderOther label='Schedule'
                bg={THEME_COLORS.PRIMARY_COLOR_DARK}
                text_color={"white"}
                color_arrow='white'
                classes="px-4 py-3" showBack onPress={() => navigation.goBack()} />
            {/* Details of schedule */}
            <View className="flex-1"
                style={{
                    backgroundColor: "white"
                }}
            >
                {/* Event dates will be displayed */}
                <ScrollView horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }} // Allow content to grow vertically
                    style={{ maxHeight: '9%' }} // Limit ScrollView to 90% of parent height
                >
                    {
                        eventDates.map((data, index) => (
                            <View
                                className="p-5"
                                style={{
                                    width: wp('60%')
                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        set_selected_index(index)
                                    }}
                                >
                                    <Text
                                        className={"text-lg text-center"}
                                        style={{
                                            color: THEME_COLORS.PRIMARY_COLOR_DARK,
                                            textDecorationLine: selected_index == index ? "underline" : "none",
                                            fontFamily: "Poppins-Medium"
                                        }}
                                    >
                                        {data}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </ScrollView>
                <ScrollView>
                    {/* Event openings time */}
                    <View
                        className="p-3 items-center justify-center space-y-1"
                        style={{
                            backgroundColor: THEME_COLORS.PRIMARY_COLOR_DARK
                        }}
                    >
                        <Text
                            className="text-xl text-center text-white"
                            style={{
                                fontFamily: "Poppins-Bold"
                            }}
                        >Opening</Text>
                        <Text
                            className={"text-lg text-white"}
                            style={{ fontFamily: "Poppins-Regular" }}
                        >
                            08:30 - 09:00 PST
                        </Text>
                    </View>

                    {/* Stuff that will be covered */}
                    <View className=""
                        style={{
                            backgroundColor: "white"
                        }}
                    >
                        {/* Data 1 */}
                        <View className="flex-row space-x-5 p-5 border-b-2 border-gray-200">
                            <View className=" justify-center">
                                <Text
                                    className={"text-xl"}
                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-SemiBold" }}
                                >
                                    08:30
                                </Text>
                                <Text
                                    className={"text-base"}
                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                                >
                                    30 min.
                                </Text>
                            </View>
                            <View className="justify-center"
                            >
                                <Text
                                    className={"text-base text-left"}
                                    numberOfLines={2}
                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-SemiBold" }}
                                >
                                    Welcome and Introduction
                                </Text>
                                <Text
                                    className={"text-base"}
                                    numberOfLines={2}
                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                                >
                                    Venue: Maqbool Block, Hall A
                                </Text>
                            </View>
                        </View>
                        {/* Data 2 */}
                        <View className="flex-row space-x-5 p-5 border-b-2 border-gray-200">
                            <View className="">
                                <Text
                                    className={"text-xl"}
                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-SemiBold" }}
                                >
                                    08:30
                                </Text>
                                <Text
                                    className={"text-base"}
                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                                >
                                    30 min.
                                </Text>
                            </View>
                            <View className=""
                            >
                                <Text
                                    className={"text-base text-left"}
                                    numberOfLines={2}
                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-SemiBold" }}
                                >
                                    Anaphylaxis and other life threatning
                                    allergic emergencies
                                </Text>
                                <Text
                                    className={"text-base"}
                                    numberOfLines={2}
                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                                >
                                    Speakers: Prof Dan Perri
                                </Text>
                                <Text
                                    className={"text-base"}
                                    numberOfLines={2}
                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                                >
                                    Venue: Maqbool Block, Hall A
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Event openings time */}
                    <View
                        className="p-3 items-center justify-center space-y-1"
                        style={{
                            backgroundColor: THEME_COLORS.PRIMARY_COLOR_DARK
                        }}
                    >
                        <Text
                            className="text-lg text-center text-white"
                            style={{
                                fontFamily: "Poppins-Medium"
                            }}
                        >Session I: Current Management of Arterial hypertension</Text>
                        <Text
                            className={"text-lg text-white"}
                            style={{ fontFamily: "Poppins-Regular" }}
                        >
                            08:30 - 09:00 PST
                        </Text>
                    </View>

                    {/* Session details will be covered */}
                    <View className=""
                        style={{
                            backgroundColor: "white"
                        }}
                    >
                        {/* Data 1 */}
                        <View className="flex-row space-x-5 p-5 border-b-2 border-gray-200">
                            <View className=" justify-">
                                <Text
                                    className={"text-xl"}
                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-SemiBold" }}
                                >
                                    08:30
                                </Text>
                                <Text
                                    className={"text-base"}
                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                                >
                                    30 min.
                                </Text>
                            </View>
                            <View className="justify-start"
                            >
                                <Text
                                    className={"text-base text-left"}
                                    numberOfLines={2}
                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-SemiBold" }}
                                >
                                    Anaphylaxis and other life threatning
                                    allergic emergencies
                                </Text>
                                <Text
                                    className={"text-base"}
                                    numberOfLines={2}
                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                                >
                                    Venue: Maqbool Block, Hall A
                                </Text>
                            </View>
                        </View>
                        {/* Data 2 */}
                        <View className="flex-row space-x-5 p-5 border-b-2 border-gray-200">
                            <View className="">
                                <Text
                                    className={"text-xl"}
                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-SemiBold" }}
                                >
                                    08:30
                                </Text>
                                <Text
                                    className={"text-base"}
                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                                >
                                    30 min.
                                </Text>
                            </View>
                            <View className=""
                            >
                                <Text
                                    className={"text-base text-left"}
                                    numberOfLines={2}
                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-SemiBold" }}
                                >
                                    Anaphylaxis and other life threatning
                                    allergic emergencies
                                </Text>
                                <Text
                                    className={"text-base"}
                                    numberOfLines={2}
                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                                >
                                    Speakers: Prof Dan Perri
                                </Text>
                                <Text
                                    className={"text-base"}
                                    numberOfLines={2}
                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                                >
                                    Venue: Maqbool Block, Hall A
                                </Text>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </View>
        </View>
    )
}