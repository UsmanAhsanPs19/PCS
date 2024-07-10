import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import HeaderOther from './components/HeaderOther'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment'
import { speakers_all_data } from '../../constants/data'
import { MEDIA_BASE_URL } from '../../helpers/APIRequest'
// import { navigation_all_data } from '../../constants/data'

export default function SessionDetails({ navigation, route }) {

    const { item, data } = route?.params
    const [isLoading, setIsLoading] = useState(false)


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
                        {item?.title}
                    </Text>
                    <View className="">
                        {/* <Text
                            className={"text-sm text-left"}
                            style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-SemiBold" }}
                        >
                            {eventDetails?.title}
                        </Text> */}
                        <View className="flex-row">
                            <Text
                                className={"text-base"}
                                style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-SemiBold" }}
                            >
                                {item?.session_time?.slot},{" "}
                            </Text>
                            <Text
                                className={"text-base"}
                                style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                            >
                                {item?.duration}
                            </Text>
                        </View>
                        <Text
                            className={"text-sm"}
                            ellipsizeMode='tail'
                            style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                        >
                            {moment(item?.session_date?.date).format("ll")}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Speakers detail */}
            <View className="">
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
                    {/* {speakers_all_data[0].image} */}
                    <Image
                        className="rounded-xl"
                        resizeMode='cover'
                        style={{
                            height: hp(18),
                            width: wp(29)
                        }}
                        source={{ uri: `${MEDIA_BASE_URL}/${data.image}` }}
                    />
                    <View className="flex-1 p-1 justify-center">
                        <Text
                            className={"text-2xl font-bold text-center"}
                            style={{ color: THEME_COLORS.HALF_WHITE_COLOR, fontFamily: "Poppins-Bold" }}
                        >
                            {data?.name}
                        </Text>
                        <Text
                            className={"text-base text-center"}
                            numberOfLines={2}
                            style={{ color: THEME_COLORS.HALF_WHITE_COLOR, fontFamily: "Poppins-Regular" }}
                        >
                            {data?.tagline}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Quiz section */}
            <View className="flex-1">
                <HeaderOther showBack={false} label='Quiz' classes="py-3 justify-center" />
                <Text
                    className={"text-xs text-center"}
                    ellipsizeMode='tail'
                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Medium" }}
                >
                    Note: Quiz will start in the last 30 minutes of the session
                </Text>
                <TouchableOpacity
                    onPress={() => { }}
                    className="my-4 w-full p-3 items-center justify-center self-cente rounded-lg"
                    style={{
                        backgroundColor: THEME_COLORS.PRIMARY_COLOR_DARK
                    }}
                >
                    {isLoading ? <ActivityIndicator color={"white"} size={"large"} /> : <Text
                        className="text-white font-semibold"
                        style={{
                            fontFamily: "Poppins-Medium"
                        }}
                    >Not Available</Text>}
                </TouchableOpacity>
            </View>

        </View>
    )
}