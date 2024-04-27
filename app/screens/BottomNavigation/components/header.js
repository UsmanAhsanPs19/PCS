import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { THEME_COLORS } from '../../../constants/colors'
import { GlbalLocale } from '../../../constants/locale'
import HeaderIcon from '../../../../assets/HeaderIcon'

export default function HomeHeader() {
    return (
        <LinearGradient
            colors={[THEME_COLORS.PRIMARY_COLOR, THEME_COLORS.PRIMARY_DARK]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="p-3"
            style={{}}>
            <View className="flex px-1 pt-10">
                <View className="w-full flex-row justify-between">
                    <Text className="text-white text-2xl py-3" style={{
                        fontFamily: "Poppins-SemiBold"
                    }}>
                        {GlbalLocale.homeHeaderText}
                    </Text>
                    <View className="flex-row justify-end">
                        <View className="h-3/5 border-l-2 border-white" />
                        <View className="ml-2">
                            <HeaderIcon />
                        </View>
                    </View>

                </View>
                <View className="w-1/4 border-b-2 border-white" />
                <Text className="text-white text-3xl mt-3 text-center" style={{
                    fontFamily: "Poppins-Bold"
                }}>
                    {GlbalLocale.headerLabel}
                </Text>
            </View>
        </LinearGradient>
    )
}