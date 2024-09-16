import { View, ActivityIndicator, FlatList, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { GlbalLocale } from '../../constants/locale'
import { StatusBar } from 'expo-status-bar'
import HeaderOther from '../OtherScreens/components/HeaderOther'
import { getRequest } from '../../helpers/APIRequest'
import QuizItem from './component/QuizItem'
import { pool_list_api, quiz_list_api } from '../../constants/APIEndpoints'

export default function QuizScreenDashboard({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const isForPool = route?.params?.isForPool || false;

    useEffect(() => {
        getQuizData(route?.params?.isForPool);
    }, [])


    function getQuizData(isForPool) {
        setIsLoading(true)
        getRequest(isForPool ? pool_list_api : quiz_list_api, null)
            .then(response => {
                console.log("Response:::::", response)
                if (response.data) {
                    setData(response.data)
                }
                setIsLoading(false)
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
            <View className="space-y-4 px-4">
                {/* Header for other Screens */}
                <View>
                    <HeaderOther
                        onPress={() => {
                            navigation.goBack()
                        }}
                        label={isForPool ? GlbalLocale.pool_label : GlbalLocale.quizes_label}
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

                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <QuizItem
                            isForPool={isForPool}
                            showDetails={true} item={item} onPress={() => {
                                if (isForPool) {
                                    navigation.navigate({
                                        name: "QuizScreen", params: {
                                            isForPool,
                                            data: item
                                        }
                                    })
                                }
                                else
                                    navigation.navigate({
                                        name: "QuizExplaination", params: {
                                            data: item
                                        }
                                    })
                            }} />
                    )}

                    ListEmptyComponent={<View className="flex-1 items-center justify-center">
                        <Text className="text-gray-400">{!isLoading && "There is no data"}</Text>
                    </View>}
                />
            </View>
        </View>
    )
}