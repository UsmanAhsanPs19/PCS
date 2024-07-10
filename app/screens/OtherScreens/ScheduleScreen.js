import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderOther from './components/HeaderOther'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { THEME_COLORS } from '../../constants/colors'
import { getRequest } from '../../helpers/APIRequest'
import { conference_schedule } from '../../constants/APIEndpoints'
import moment from 'moment'

export default function ScheduleScreen({ navigation }) {
    const [selected_index, set_selected_index] = useState()
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getSchedule();
    }, []);

    useEffect(() => {
        if (Object.keys(data).length) {
            set_selected_index(Object.keys(data)[0])
        }
    }, [data])

    // Get list of top speakers
    async function getSchedule() {
        setIsLoading(true);
        await getRequest(conference_schedule)
            .then((response) => {
                console.log("schedules Data::", JSON.stringify(response));
                if (response.status && response.data) {
                    const scheduleData = response.data
                    if (scheduleData) {
                        if (scheduleData.length) {
                            const transformedData = {};
                            scheduleData.forEach(item => {
                                transformedData[item.date] = item.get_slots;
                            });
                            setData(transformedData)
                        }
                        setIsLoading(false);
                    }
                }

            })
            .catch((error) => {
                console.log("getSpeakers Error:::", error);
                setIsLoading(false);
            });
    }

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
                        Object.keys(data).map((date) => (
                            <View
                                className="p-5"
                                style={{
                                    width: wp('60%')
                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        set_selected_index(date)
                                    }}
                                >
                                    <Text
                                        className={"text-lg text-center"}
                                        style={{
                                            color: THEME_COLORS.PRIMARY_COLOR_DARK,
                                            textDecorationLine: selected_index == date ? "underline" : "none",
                                            fontFamily: "Poppins-Medium"
                                        }}
                                    >
                                        {moment(date).format("dddd, ll")}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </ScrollView>
                <View>
                    <FlatList
                        data={data[selected_index]}
                        renderItem={({ item, index }) => (
                            <View>
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
                                    >{item.title}</Text>
                                    <Text
                                        className={"text-lg text-white"}
                                        style={{ fontFamily: "Poppins-Regular" }}
                                    >
                                        {item.slot}
                                    </Text>
                                </View>
                                <View className=""
                                    style={{
                                        backgroundColor: "white"
                                    }}
                                >
                                    {item.get_schedules?.map((val, index) => (
                                        <View key={index} className="flex-row space-x-5 p-5 border-b-2 border-gray-200">
                                            <View className=" justify-center">
                                                <Text
                                                    className={"text-xl"}
                                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-SemiBold" }}
                                                >
                                                    {val.start_time}
                                                </Text>
                                                <Text
                                                    className={"text-base"}
                                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                                                >
                                                    {val.duration}
                                                </Text>
                                            </View>
                                            <View className="justify-center"
                                            >
                                                <Text
                                                    className={"text-base text-left"}
                                                    numberOfLines={2}
                                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-SemiBold" }}
                                                >
                                                    {val.title}
                                                </Text>
                                                <View>
                                                    {val.schedule_speakers?.map(item => (<Text
                                                        key={item.id}
                                                        className={"text-base"}
                                                        numberOfLines={2}
                                                        style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                                                    >
                                                        Speakers: {item?.speakers_name?.name}
                                                    </Text>))}
                                                </View>
                                                <Text
                                                    className={"text-base"}
                                                    numberOfLines={2}
                                                    style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                                                >
                                                    Venue: {val.venue}
                                                </Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                        ListEmptyComponent={<View className="self-center">
                            {/* Show loading */}
                            {
                                isLoading ?
                                    <ActivityIndicator
                                        color={"white"}
                                        size={"large"}
                                        className="self-center"
                                    /> : <Text className="text-center">There is no scheduled data</Text>
                            }
                        </View>}
                    />

                </View>
            </View>
        </View>
    )
}

function getExtra() {
    {/* Session details will be covered */ }
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
}