import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import { GlbalLocale } from '../../constants/locale'
import HeaderOther from './components/HeaderOther'
import { navigation_all_data } from '../../constants/data'
import { useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'

export default function NavigationPortal({ navigation }) {
    const { isAuthorized } = useSelector((state) => state?.AuthStore);
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
                        label={GlbalLocale.navigation_label}
                    />
                </View>
                <View className="h-full">
                    <FlatList
                        data={navigation_all_data}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    if (item.screenName === "RegisterForConference" && !isAuthorized) {
                                        Toast.show({
                                            text1: "Not authorized",
                                            text2: "Please login first to register in conference",
                                            type: "error",
                                            autoHide: true
                                        })
                                    }
                                    else if (item.screenName) {
                                        navigation.navigate(item.screenName)
                                    }
                                }}
                                className="mb-4 p-5 rounded-xl"
                                style={{
                                    backgroundColor: THEME_COLORS.PRIMARY_DARK
                                }}
                            >
                                <Text
                                    className="text-white text-base"
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >{item?.name}</Text>
                            </TouchableOpacity>)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </View>
    )
}