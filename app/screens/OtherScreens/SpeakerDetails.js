import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import HeaderOther from './components/HeaderOther'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment'
import { MEDIA_BASE_URL } from '../../helpers/APIRequest'
// import { navigation_all_data } from '../../constants/data'

export default function SpeakerDetails({ navigation, route }) {
    const data = route?.params || null;
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
                        top: hp(-4)
                    }}
                >
                    <Image
                        className="rounded-xl"
                        resizeMode='contain'
                        style={{
                            height: hp(18),
                            width: wp(29)
                        }}
                        source={{ uri: `${MEDIA_BASE_URL}/${data.image}` }}
                    />
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
                        {data?.tagline}
                    </Text>
                </View>
            </View>

            <FlatList
                data={data?.get_schedule || []}
                className="mt-3"
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate({ name: "SessionDetails", params: { item: item.schedule_details, data } })
                        }}
                        key={item.schedule_id} className="h-auto rounded-xl pl-0.5 my-2 mx-1"
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
                                {moment(item?.schedule_details?.session_date?.date).format("ddd, ll")}
                            </Text>
                            <View className="flex-row justify-between space-x-3">
                                <View className="">
                                    <Text
                                        className={"text-base"}
                                        style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-SemiBold" }}
                                    >
                                        {item?.schedule_details?.session_time?.slot}
                                    </Text>
                                    <Text
                                        className={"text-lg"}
                                        style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                                    >
                                        {item?.schedule_details?.duration}
                                    </Text>
                                </View>
                                <View className="flex-1"
                                    style={{}}
                                >
                                    <Text
                                        className={"text-base text-left"}
                                        numberOfLines={2}
                                        style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-SemiBold" }}
                                    >
                                        {item?.schedule_details?.title}
                                    </Text>
                                    <Text
                                        className={"text-sm mt-1"}
                                        numberOfLines={2}
                                        style={{ color: THEME_COLORS.PRIMARY_COLOR_DARK, fontFamily: "Poppins-Regular" }}
                                    >
                                        {item?.schedule_details?.venue}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
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