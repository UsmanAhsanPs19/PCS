import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { THEME_COLORS } from '../../../constants/colors'
import { GlbalLocale } from '../../../constants/locale'
import HeaderIcon from '../../../../assets/HeaderIcon'
import { useSelector } from 'react-redux'

export default function HomeHeader() {
    const { general_info } = useSelector((state) => state?.GeneralState);
    return (
        <LinearGradient
            colors={[THEME_COLORS.PRIMARY_COLOR, THEME_COLORS.PRIMARY_DARK]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="p-3"
            style={{}}>
            <View className="flex px-1 pt-8 w-fit">
                <View className="w-full flex-row justify-between">
                    <Text className="text-white text-2xl py-3 w-4/5"
                        numberOfLines={3}
                        ellipsizeMode='middle'
                        style={{
                            fontFamily: "Poppins-SemiBold"
                        }}>
                        {/* {GlbalLocale.homeHeaderText} */}
                        {general_info?.title}
                    </Text>
                    <View className="flex-row items-center w-1/5">
                        <View className="h-3/5 border-l-2 border-white" />
                        <View className="ml-2">
                            <HeaderIcon />
                        </View>
                    </View>
                </View>
                <View className="w-1/4 border-b-2 border-white" />
                <Text className=" text-white text-2xl mt-3 text-center" style={{
                    fontFamily: "Poppins-Bold"
                }}>
                    {GlbalLocale.headerLabel}
                </Text>
            </View>
        </LinearGradient>
    )
}