import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { THEME_COLORS } from '../../constants/colors'
import HeaderOther from '../OtherScreens/components/HeaderOther'
import { StatusBar } from 'expo-status-bar'
import { GlbalLocale } from '../../constants/locale'
import { ExclamationTriangleIcon } from 'react-native-heroicons/solid'
import { heightPercentageToDP } from 'react-native-responsive-screen'

export default function ErrorScreen({ navigation, route }) {
    const { message } = route?.params || {};
    return (
        <View
            style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
            className="flex-1 pt-10"
        >
            <StatusBar style='dark' />
            <View className="space-y-10 px-4 h-5/6">
                {/* Header for other Screens */}
                <View>
                    <HeaderOther
                        showBack={true}
                        onPress={() => {
                            navigation.goBack()
                        }}

                        label={GlbalLocale.error_label}
                    />
                </View>
                <View className="items-center space-y-5">
                    <View
                        className="bg-red-600 rounded-full p-5"
                    >
                        <ExclamationTriangleIcon
                            size={heightPercentageToDP('30%')}
                            color={"#FFE500"}
                        />
                    </View>
                    <Text
                        className="text-base text-center"
                        numberOfLines={3}
                        ellipsizeMode='tail'
                        style={{
                            fontFamily: "Poppins-SemiBold",
                            color: THEME_COLORS.textColor
                        }}
                    >{message}</Text>
                </View>
            </View>
            <View
                className="left-1 right-1 absolute bottom-1 mx-3 my-2"
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Dashboard" }],
                        });
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
                    >{GlbalLocale.back_to_home_label}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}