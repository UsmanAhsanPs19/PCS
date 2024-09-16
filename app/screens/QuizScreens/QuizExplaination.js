import { View, ActivityIndicator, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { GlbalLocale } from '../../constants/locale'
import { StatusBar } from 'expo-status-bar'
import HeaderOther from '../OtherScreens/components/HeaderOther'
import QuizItem from './component/QuizItem'
import { ClockIcon, ListBulletIcon, StarIcon } from 'react-native-heroicons/outline'

export default function QuizExplaination({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(false)
    const data = route?.params?.data || {};


    useEffect(() => {

    }, [])

    return (
        <View
            style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
            className="flex-1 pt-10"
        >
            <StatusBar style='dark' />
            <ScrollView className="space-y-5 px-4">
                {/* Header for other Screens */}
                <View>
                    <HeaderOther
                        onPress={() => {
                            navigation.goBack()
                        }}
                        label={GlbalLocale.quizes_label}
                    />
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
                    <QuizItem item={data} />
                </View>
                <View className="space-y-4 px-2">
                    <View>
                        <Text style={{ color: THEME_COLORS.textColor, fontFamily: "Poppins-SemiBold" }}>Brief explanation about this quiz</Text>
                    </View>
                    <View className="space-y-4">
                        <View className="flex flex-row space-x-3">
                            <View className="bg-gray-700 items-center self-start p-2 rounded-full">
                                <ListBulletIcon color={'white'} size={20} />
                            </View>
                            <View>
                                <Text style={{ color: THEME_COLORS.textColor, fontFamily: "Poppins-Medium" }}>{data?.quiz_questions?.length || 0} Questions</Text>
                                <Text
                                    className="text-xs"
                                    style={{ color: THEME_COLORS.PLACEHOLDER_COLOR, fontFamily: "Poppins-Regular" }}>{data?.quiz_questions?.length || 0} points for a correct answer</Text>
                            </View>
                        </View>
                        <View className="flex flex-row space-x-3">
                            <View className="bg-gray-700 items-center self-start p-2 rounded-full">
                                <ClockIcon color={'white'} size={20} />
                            </View>
                            <View>
                                {/* <Text style={{ color: THEME_COLORS.textColor, fontFamily: "Poppins-Medium" }}>{data?.schedule_details?.duration || "N/A"}</Text> */}
                                <Text style={{ color: THEME_COLORS.textColor, fontFamily: "Poppins-Medium" }}>{"5 Minutes"}</Text>
                                <Text
                                    className="text-xs"
                                    style={{ color: THEME_COLORS.PLACEHOLDER_COLOR, fontFamily: "Poppins-Regular" }}>Total duration of the quiz</Text>
                            </View>
                        </View>
                        <View className="flex flex-row space-x-3">
                            <View className="bg-gray-700 items-center self-start p-2 rounded-full">
                                <StarIcon color={'white'} size={20} />
                            </View>
                            <View>
                                <Text style={{ color: THEME_COLORS.textColor, fontFamily: "Poppins-Medium" }}>Win {data?.quiz_questions?.length || 0} Stars</Text>
                                <Text
                                    className="text-xs"
                                    style={{ color: THEME_COLORS.PLACEHOLDER_COLOR, fontFamily: "Poppins-Regular" }}>Answer all questions correctly</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="mt-2 space-y-4 px-2">
                    <View>
                        <Text style={{ color: THEME_COLORS.textColor, fontFamily: "Poppins-SemiBold" }}>Click submit if you are sure you want to complete all the quizzes</Text>
                    </View>
                    <View className="space-y-4">
                        <View className="flex-row items-center space-x-3">
                            <View
                                className="bg-black w-2 h-2 rounded-full"
                                style={{ color: THEME_COLORS.textColor, fontFamily: "Poppins-Regular" }}
                            />
                            <Text
                                className="text-sm"
                                style={{ color: THEME_COLORS.textLightGrayColor, fontFamily: "Poppins-Regular" }}
                            >10 point awarded for a correct answer and no marks for a incorrect answer</Text>
                        </View>
                        <View className="flex-row items-center space-x-3">
                            <View
                                className="bg-black w-2 h-2 rounded-full"
                                style={{ color: THEME_COLORS.textColor, fontFamily: "Poppins-Regular" }}
                            />
                            <Text
                                className="text-sm"
                                style={{ color: THEME_COLORS.textLightGrayColor, fontFamily: "Poppins-Regular" }}
                            >Tap on options to select the correct answer.</Text>
                        </View>
                        <View className="flex-row items-center space-x-3">
                            <View
                                className="bg-black w-2 h-2 rounded-full"
                                style={{ color: THEME_COLORS.textColor, fontFamily: "Poppins-Regular" }}
                            />
                            <Text
                                className="text-sm"
                                style={{ color: THEME_COLORS.textLightGrayColor, fontFamily: "Poppins-Regular" }}
                            >Tap on the bookmark icon to save interesting questions.</Text>
                        </View>
                        <View className="flex-row items-center space-x-3">
                            <View
                                className="bg-black w-2 h-2 rounded-full"
                                style={{ color: THEME_COLORS.textColor, fontFamily: "Poppins-Regular" }}
                            />
                            <Text
                                className="text-sm"
                                style={{ color: THEME_COLORS.textLightGrayColor, fontFamily: "Poppins-Regular" }}
                            >Click submit if you are sure you want to complete all the quizzes</Text>
                        </View>

                    </View>
                </View>
            </ScrollView>
            <View
                className="left-1 right-1 absolute bottom-1 mx-3 my-2"
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.replace("QuizScreen", {
                            data
                        }
                        )
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
                    >Start Quiz</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}