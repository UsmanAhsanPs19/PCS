import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import { THEME_COLORS } from '../../../constants/colors'

export default function CustomButton({ text, onClick = () => { }, disabled = false, isLoading = false }) {
    return (
        <TouchableOpacity
            onPress={onClick}
            disabled={disabled || isLoading}
            style={{
                shadowOffset: { width: 0, height: 10 },
                shadowRadius: 35,
                shadowColor: THEME_COLORS.BUTTON_SHADOW,
                shadowOpacity: 0.4,
                elevation: 5, // For Android,
                width: wp("75%"),
                backgroundColor: disabled || isLoading ? "lightgray" : THEME_COLORS.PRIMARY_COLOR
            }}
            className="my-3 py-2 rounded-xl self-center"
        >
            <View
                className="flex-row items-center"
            >
                <Text
                    numberOfLines={1}
                    className={"flex-1 text-center text-lg font-medium space-y-2 self-center text-white"}
                    style={{ fontSize: hp(2), fontFamily: "Poppins-Regular" }}
                >{text?.toLocaleUpperCase()}
                </Text>
                <View
                    className={"rounded-full p-1 flex items-end"}
                    style={{ position: "absolute", right: wp(4) }}
                >
                    {isLoading && <ActivityIndicator color={"white"} />}
                </View>
            </View>
        </TouchableOpacity>
    )
}