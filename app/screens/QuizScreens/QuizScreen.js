import { View, ActivityIndicator, FlatList, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { GlbalLocale } from '../../constants/locale'
import { StatusBar } from 'expo-status-bar'
import HeaderOther from '../OtherScreens/components/HeaderOther'
import { postRequest } from '../../helpers/APIRequest'
import QuizItem from './component/QuizItem'
import { get_pool_data_api, get_quiz_api, post_quiz_answer, submit_pool_ans_api } from '../../constants/APIEndpoints'
import QuizQuestion from './component/QuizQuestion'
import Toast from 'react-native-toast-message'

export default function QuizScreen({ navigation, route }) {
    const flatListRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({});
    const isForPool = route?.params?.isForPool || false;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [quiz, setQuiz] = useState([])

    useEffect(() => {
        if (route?.params?.data?.id)
            getQuiz(route?.params?.data, route?.params?.isForPool);
    }, [route?.params?.data])

    useEffect(() => {
        if (selectedIndex > 0) {
            flatListRef.current?.scrollToIndex({ index: selectedIndex, animated: true });
        }
    }, [selectedIndex])


    function getQuiz(props_data, isPool) {
        let data = new FormData();
        if (isPool) {
            data.append('type', props_data?.type)
            data.append('poll_id', props_data?.id);
        }
        else
            data.append('quiz_id', props_data?.id);
        setIsLoading(true)
        postRequest(isPool ? get_pool_data_api : get_quiz_api, data, null)
            .then(response => {
                console.log("Data::get:::quiz", JSON.stringify(response))
                if (response.status == 1) {
                    if (response?.data && response.data?.length) {
                        setData(response.data[0])
                        setQuiz(isPool ? response.data[0].poll_questions : response.data[0].quiz_questions)
                    }
                    else {
                        setQuiz([])
                    }
                }
                else {
                    Toast.show({
                        type: 'success',
                        text1: isPool ? 'Pool' : 'Quiz',
                        text2: isPool ? "Thanks for submitting a pool." : (response.message || "There is some issue please try again later."),
                        autoHide: true,
                        position: "top"
                    });
                    if (isForPool) {
                        navigation.goBack();
                    }
                    else
                        navigation.replace("QuizResult", {
                            isForPool,
                            data: (route?.params?.data?.schedule_details && route?.params?.data) || response.data[0]
                        }
                        )
                }
                setIsLoading(false)
            }).catch(error => {
                setIsLoading(false)
                console.log("Error Quiz get:", error)
            })
    }

    const handleAnswerSelection = (selectedOption) => {
        const updatedQuiz = [...quiz]; // Create a copy of the quiz array
        updatedQuiz[selectedIndex].selectedAnswer = selectedOption; // Update the selected answer for the clicked question
        setQuiz(updatedQuiz); // Update the state with the modified quiz array
    };

    function handleSubmitAnswer() {
        let answer = quiz[selectedIndex]?.selectedAnswer;
        if (answer === undefined || !answer) {
            Alert.alert("Error!", "Please select answer", [
                {
                    text: "Dismiss"
                }
            ])
        }
        else {
            setIsLoading(true)
            let apiData = new FormData();
            apiData.append('question_id', quiz[selectedIndex]?.id)
            if (isForPool) {
                apiData.append('type', data?.type)
                apiData.append('poll_id', quiz[selectedIndex]?.poll_id)
            }
            else {
                apiData.append('quiz_id', quiz[selectedIndex]?.quiz_id)
            }
            apiData.append('selected_option', answer)

            postRequest(isForPool ? submit_pool_ans_api : post_quiz_answer, apiData)
                .then(response => {
                    Toast.show({
                        type: response.status ? 'success' : "error",
                        text1: isForPool ? 'Pool Answer' : 'Quiz Answer',
                        text2: isForPool && selectedIndex === quiz.length - 1 ? "Thanks for submitting pool." : (response.message || response.error.message || "There is some issue please try again later."),
                        // text1: 'Quiz Answer',
                        // text2: response.message || response.error.message || "There is some issue please try again later.",
                        autoHide: true,
                        position: "bottom"
                    });
                    if (response.status) {
                        if (selectedIndex === quiz.length - 1) {
                            if (isForPool) {
                                navigation.goBack();
                            }
                            else
                                navigation.replace("QuizResult", {
                                    data
                                }
                                )
                        }
                        else
                            setSelectedIndex(selectedIndex + 1)

                    }
                    setIsLoading(false)
                }).catch(error => {
                    setIsLoading(false)
                    console.log("Error::::", error)
                })
        }
    }

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
                        label={isForPool ? GlbalLocale.pool_label : GlbalLocale.quizes_label}
                    />
                </View>
                {!isLoading && <View>
                    <QuizItem item={data} isForPool={isForPool} />
                </View>}
                {
                    isLoading &&
                    <ActivityIndicator
                        color={THEME_COLORS.PRIMARY_COLOR}
                        size={"large"}
                        className="self-center"
                    />
                }
                {!isLoading && quiz?.length &&
                    <View className="px-2">
                        <View>
                            <FlatList
                                ref={flatListRef}
                                data={quiz}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <View className="space-y-4">
                                        <View
                                            onPress={() => {
                                                setSelectedIndex(index)
                                            }}
                                            style={{
                                                backgroundColor: selectedIndex == index ? THEME_COLORS.PRIMARY_COLOR : THEME_COLORS.GRAY_300
                                            }}
                                            className="bg-gray-300 items-center justify-center w-10 h-10 rounded-full mx-3 self-center flex">
                                            <Text
                                                style={{
                                                    fontFamily: "Poppins-SemiBold"
                                                }}
                                                className="text-white">{index + 1}</Text>
                                        </View>
                                        <View
                                            style={{
                                                backgroundColor: selectedIndex == index ? THEME_COLORS.PRIMARY_COLOR : THEME_COLORS.GRAY_300
                                            }}
                                            className="h-0.5"
                                        />
                                    </View>
                                )}
                                horizontal
                            />
                        </View>
                        <View className="mt-10">
                            <QuizQuestion quiz={quiz} selectedIndex={selectedIndex} handleAnswerSelection={handleAnswerSelection} />
                        </View>
                        <View className="flex-row flex mt-10 items-center justify-between" >
                            {/* <TouchableOpacity
                                onPress={() => {
                                    setSelectedIndex(selectedIndex - 1)
                                }}
                                disabled={selectedIndex == 0}
                                style={{
                                    backgroundColor: selectedIndex === 0 ? THEME_COLORS.GRAY_300 : THEME_COLORS.PRIMARY_COLOR
                                }}
                                className="bg-gray-300 items-center justify-center p-2 w-11 h-11 rounded-full self-center flex">
                                <Text
                                    className="text-3xl"
                                    style={{
                                        fontFamily: "Poppins-Regular",
                                        color: "white"
                                    }}
                                >{"<"}</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity
                                onPress={() => {
                                    // navigation.navigate({
                                    //     name: "QuizResult", params: {
                                    //         data
                                    //     }
                                    // })
                                    // setSelectedIndex(selectedIndex + 1)
                                    handleSubmitAnswer()
                                }}
                                className="border-red-500 border-2 rounded p-3 flex-1 items-center mx-5"
                            >
                                <Text
                                    style={{
                                        fontFamily: "Poppins-Regular",
                                        color: THEME_COLORS.PRIMARY_COLOR
                                    }}
                                    className="">Submit Answer</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity
                                onPress={() => {
                                    setSelectedIndex(selectedIndex + 1)
                                }}
                                style={{
                                    backgroundColor: selectedIndex < quiz.length - 1 ? THEME_COLORS.PRIMARY_COLOR : THEME_COLORS.GRAY_300
                                }}
                                disabled={selectedIndex == quiz.length - 1}
                                className="bg-gray-300 items-center justify-center p-2 w-11 h-11 rounded-full self-center flex ">
                                <Text
                                    className="text-3xl"
                                    style={{
                                        fontFamily: "Poppins-Regular",
                                        color: "white"
                                    }}>{">"}</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>}

            </ScrollView>
            {/* <View
                className="left-1 right-1 absolute bottom-1 mx-3 my-2"
            >
                <TouchableOpacity
                    onPress={() => { }}
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
            </View> */}
        </View >
    )
}