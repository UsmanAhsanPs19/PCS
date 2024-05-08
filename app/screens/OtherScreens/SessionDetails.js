import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import HeaderOther from './components/HeaderOther'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import moment from 'moment'
import { speakers_all_data } from '../../constants/data'
// import { navigation_all_data } from '../../constants/data'

export default function SessionDetails({ navigation, route }) {

    const eventDetails = {
        date: moment().format("ll"),
        time: "10:00 - 13:00",
        duration: "3 Hours",
        title: "Anaphylaxis and other life threatning allergic emergencies",
        venue: "Maqbool Block, Hall A"
    }
    return (
        <View
            style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
            className="pt-12 flex-1 px-4"
        >
            <StatusBar style='dark' />
            <HeaderOther label='Session Details' classes="py-3" showBack onPress={() => navigation.goBack()} />

            {/* Session details */}
            <View className="h-auto rounded-xl pl-0.5 my-2 mx-1"
                style={{
                    elevation: 3,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    backgroundColor: THEME_COLORS.PRIMARY_COLOR_DARK
                }}
            >
                <View className="p-2 rounded-xl"
                    style={{
                        backgroundColor: "white"
                    }}
                >
                    <Text
                        className={"text-sm"}
                        ellipsizeMode='tail'
                        style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                    >
                        Session V: Intensive Care
                    </Text>
                    <View className="">
                        <Text
                            className={"text-sm text-left"}
                            style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-SemiBold" }}
                        >
                            {eventDetails?.title}
                        </Text>
                        <View className="flex-row">
                            <Text
                                className={"text-lg"}
                                style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-SemiBold" }}
                            >
                                {eventDetails?.time},{" "}
                            </Text>
                            <Text
                                className={"text-lg"}
                                style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                            >
                                {eventDetails?.duration}
                            </Text>
                        </View>
                        <Text
                            className={"text-sm"}
                            ellipsizeMode='tail'
                            style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                        >
                            {eventDetails?.date}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Speakers detail */}
            <View className="flex-1">
                <HeaderOther showBack={false} label='Speakers' classes="py-3 justify-center" />
                <View
                    className="flex-row rounded-xl mb-4"
                    style={{
                        elevation: 3,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.3,
                        shadowRadius: 3,
                        backgroundColor: THEME_COLORS.PRIMARY_COLOR_DARK
                    }}
                >
                    {speakers_all_data[0].image}
                    <View className="flex-1 p-1 speakers_all_data[0]s-center justify-center">
                        <Text
                            className={"text-2xl font-bold text-center"}
                            style={{ color: THEME_COLORS.HALF_WHITE_COLOR, fontFamily: "Poppins-Bold" }}
                        >
                            {speakers_all_data[0].name}
                        </Text>
                        <Text
                            className={"text-base text-center"}
                            numberOfLines={2}
                            style={{ color: THEME_COLORS.HALF_WHITE_COLOR, fontFamily: "Poppins-Regular" }}
                        >
                            {speakers_all_data[0].designation}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}