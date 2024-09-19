import { View, Text, ActivityIndicator, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import QuizItem from './component/QuizItem';
import { THEME_COLORS } from '../../constants/colors';
import HeaderOther from '../OtherScreens/components/HeaderOther';
import { GlbalLocale } from '../../constants/locale';
import { postRequest } from '../../helpers/APIRequest';
import { get_quiz_leaderboard } from '../../constants/APIEndpoints';
import DiamondMedalIcon from '../../../assets/DiamondMedal';
import SilverMedalIcon from '../../../assets/SilverMedal';
import BronzeMedalIcon from '../../../assets/BronzeMedal';

export default function QuizLeaderboard({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(false);
    const data = route?.params?.data || {};

    const [users, setUsers] = useState([])

    useEffect(() => {
        getLeaderBoard()
    }, [])

    function getLeaderBoard() {
        let apiData = new FormData();
        apiData.append('quiz_id', route?.params?.data?.id);
        setIsLoading(true)
        postRequest(get_quiz_leaderboard, apiData)
            .then(response => {
                if (response.status) {
                    setUsers(response.leaderboard_data || [])
                }
                setIsLoading(false)
            }).catch(error => {
                setIsLoading(false)
                console.log("Error:::", error)
            })
    }

    // Sorting function
    const sortedUsers = [...users].sort((a, b) => {
        if (a.points === b.points) {
            return a.total_time - b.total_time; // Sort by time ascending if points are equal
        }
        return b.earned_points - a.earned_points; // Sort by points descending
    });

    return (
        <View
            style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
            className="flex-1 pt-10"
        >
            <StatusBar style='dark' />
            <View className="space-y-4 px-4">
                {/* Header for other Screens */}
                <View>
                    <HeaderOther
                        onPress={() => {
                            navigation.goBack()
                        }}
                        label={GlbalLocale.quizes_label}
                    />
                </View>
                {/* Quiz item */}
                <View>
                    <QuizItem item={data} />
                </View>
                {/* Loading Progress */}
                <View>
                    <Text
                        className="text-xl text-center mx-3"
                        numberOfLines={1}
                        ellipsizeMode='middle'
                        style={{
                            fontFamily: "Poppins-Bold",
                            color: THEME_COLORS.PRIMARY_COLOR
                        }}
                    >Leaderboard</Text>
                </View>
                {
                    isLoading &&
                    <ActivityIndicator
                        color={THEME_COLORS.PRIMARY_COLOR}
                        size={"large"}
                        className="self-center"
                    />
                }
                <View>
                    <FlatList
                        data={sortedUsers}
                        renderItem={({ item, index }) => (
                            <View className="flex-row justify-between items-center space-x-4 px-3 my-2">
                                <View className="border-2 border-gray-300 w-7 h-7 items-center justify-center rounded-full">
                                    <Text
                                        className="text-gray-500"
                                        style={{
                                            fontFamily: "Poppins-Medium"
                                        }}
                                    >{index + 1}</Text>
                                </View>
                                <View className="flex-1 flex-row items-center space-x-2">
                                    {/* <Image
                                        className="bg-gray-200 rounded-full self-center"
                                        style={{
                                            width: wp('13%'),
                                            height: wp('13%')
                                        }}
                                    /> */}
                                    <View>
                                        <Text
                                            className="text-base text-center"
                                            numberOfLines={1}
                                            ellipsizeMode='middle'
                                            style={{
                                                fontFamily: "Poppins-Medium",
                                                color: THEME_COLORS.textColor
                                            }}
                                        >{item.name}</Text>
                                        <Text
                                            style={{
                                                color: THEME_COLORS.PLACEHOLDER_COLOR, fontFamily: "Poppins-Regular"
                                            }}
                                        >{item.earned_points} point(s)</Text>
                                    </View>
                                </View>
                                <View>
                                    {
                                        index === 0 ? <DiamondMedalIcon /> : index == 1 ? <SilverMedalIcon /> : index == 2 ? <BronzeMedalIcon /> : <></>
                                    }
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    )
}