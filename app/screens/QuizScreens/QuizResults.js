import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { postRequest } from '../../helpers/APIRequest';
import { StatusBar } from 'expo-status-bar';
import { GlbalLocale } from '../../constants/locale';
import { THEME_COLORS } from '../../constants/colors';
import HeaderOther from '../OtherScreens/components/HeaderOther';
import QuizItem from './component/QuizItem';
import CircularProgress from 'react-native-circular-progress-indicator';
import { get_quiz_results } from '../../constants/APIEndpoints';
import Toast from 'react-native-toast-message';


export default function QuizResults({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(false);
    const data = route?.params?.data || {};
    const [apiResponse, setApiResponse] = useState({})

    useEffect(() => {
        getQuizResult(route?.params?.isForPool);
    }, [])

    function getQuizResult() {
        let apiData = new FormData();
        apiData.append('quiz_id', route?.params?.data?.id);
        setIsLoading(true)
        postRequest(get_quiz_results, apiData, null)
            .then(response => {
                setIsLoading(false)
                if (response.status) {
                    setApiResponse(response)
                } else {
                    Toast.show({
                        type: "error",
                        text1: 'Quiz Result',
                        text2: response.message || response.error.message || "There is some issue please try again later.",
                        autoHide: true,
                        position: "top"
                    });
                }
            }).catch(error => {
                setIsLoading(false)
                console.log("Error Quiz get:", error)
            })
    }
    return (
        <View
            style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
            className="flex-1 pt-10"
        >
            <StatusBar style='dark' />
            <View className="space-y-5 px-4">
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
                {
                    isLoading &&
                    <ActivityIndicator
                        color={THEME_COLORS.PRIMARY_COLOR}
                        size={"large"}
                        className="self-center"
                    />
                }
                {!isLoading && apiResponse.total_points && <View>
                    <View className="items-center">
                        <View className="h-3/4 w-11/12 bg-red-200 rounded-3xl items-center justify-center"
                            style={{

                            }}
                        >
                            <View className="items-center my-8">
                                <Text
                                    className="text-lg text-center"
                                    style={{
                                        fontFamily: "Poppins-SemiBold",
                                        color: THEME_COLORS.textColor
                                    }}
                                >You got <Text
                                    style={{
                                        fontFamily: "Poppins-SemiBold",
                                        color: THEME_COLORS.PRIMARY_COLOR
                                    }}
                                    className="text-lg">{apiResponse?.correct_answer} Point(s)</Text> from{"\n"}this quiz!</Text>
                            </View>
                            <CircularProgress
                                value={apiResponse?.correct_answer}
                                radius={70}
                                duration={500}
                                progressValueColor={THEME_COLORS.PRIMARY_COLOR}
                                activeStrokeColor={THEME_COLORS.PRIMARY_COLOR}
                                inActiveStrokeColor='white'
                                maxValue={apiResponse?.total_points}
                                title={`/ ${apiResponse?.total_points}`}
                                titleColor={'white'}
                                titleStyle={{ fontFamily: "Poppins-Regular" }}
                            />

                        </View>
                    </View>
                    {/* <View
                        className="my-3"
                    >
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate({
                                    name: "QuizLeaderboard", params: {
                                        data
                                    }
                                })
                            }}
                            className="my-2 w-full p-2 items-center justify-center self-center rounded-lg"
                            style={{
                                backgroundColor: THEME_COLORS.PRIMARY_COLOR
                            }}
                        >
                            <Text
                                className="text-white"
                                style={{
                                    fontFamily: "Poppins-Regular"
                                }}
                            >View score board</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>}
            </View>
        </View>
    )
}