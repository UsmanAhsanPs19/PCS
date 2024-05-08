import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import HeaderOther from './components/HeaderOther'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import moment from 'moment'
// import { navigation_all_data } from '../../constants/data'

export default function SpeakerDetails({ navigation, route }) {
    const data = route?.params || null;
    const eventDetails = [{
        date: moment().format("ll"),
        time: "10:00 - 13:00",
        duration: "3 Hours",
        title: "Anaphylaxis and other life threatning allergic emergencies",
        venue: "Maqbool Block, Hall A"
    }, {
        date: moment().format("ll"),
        time: "10:00 - 13:00",
        duration: "3 Hours",
        title: "Anaphylaxis and other life threatning allergic emergencies",
        venue: "Maqbool Block, Hall A"
    }]
    return (
        <View
            style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
            className="pt-12 px-4 flex-1"
        >
            <StatusBar style='dark' />
            <HeaderOther label='' classes="py-3" showBack onPress={() => navigation.goBack()} />
            <View
                className="rounded-xl items-center"
                style={{
                    elevation: 3,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    backgroundColor: THEME_COLORS.PRIMARY_COLOR_DARK
                }}
            >
                <View className=""
                    style={{
                        top: hp(-6)
                    }}
                >
                    {data?.image}
                </View>
                <View
                    style={{
                        top: hp(-2)
                    }}
                    className="p-1 items-center justify-start">
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
                        {data?.designation}
                    </Text>
                </View>
            </View>

            <FlatList
                data={eventDetails}
                className="mt-3"
                renderItem={({ item, index }) => (
                    < View className="h-auto rounded-xl pl-0.5 my-2 mx-1"
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
                                className={"text-lg"}
                                ellipsizeMode='tail'
                                style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                            >
                                {item?.date}
                            </Text>
                            <View className="flex-row space-x-2">
                                <View className="">
                                    <Text
                                        className={"text-lg"}
                                        style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-SemiBold" }}
                                    >
                                        {item?.time}
                                    </Text>
                                    <Text
                                        className={"text-lg"}
                                        style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                                    >
                                        {item?.duration}
                                    </Text>
                                </View>
                                <View className=""
                                    style={{ flex: 1 }}
                                >
                                    <Text
                                        className={"text-sm text-left"}
                                        numberOfLines={2}
                                        style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-SemiBold" }}
                                    >
                                        {item?.title}
                                    </Text>
                                    <Text
                                        className={"text-sm mt-1"}
                                        numberOfLines={2}
                                        style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                                    >
                                        {item?.venue}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                ListEmptyComponent={<View className="flex-1 bg-white items-center justify-center">
                    <Text
                        className={"text-base text-center"}
                        numberOfLines={2}
                        style={{ color: THEME_COLORS.textLightGrayColor, fontFamily: "Poppins-Regular" }}
                    >
                        {"No data to display"}
                    </Text>
                </View>}
            />
        </View>
    )
}