import { View, Text } from 'react-native'
import React from 'react'
import { THEME_COLORS } from '../../../constants/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ArrowLeftIcon, ArrowRightIcon } from 'react-native-heroicons/outline';

export default function HeaderOther({ label = "No Label", classes, text_color = THEME_COLORS.PRIMARY_COLOR, onPress, showBack = true, color_arrow = THEME_COLORS.textColor, bg = THEME_COLORS.BG_COLOR }) {
    return (
        <View className={`flex-row justify-between items-center ${classes}`}
            style={{
                backgroundColor: bg
            }}
        >
            {showBack && <ArrowLeftIcon
                onPress={onPress}
                size={hp(2.5)}
                color={color_arrow}
            />}
            <Text
                className="text-xl text-center"
                style={{
                    fontFamily: "Poppins-Bold",
                    color: text_color
                }}
            >{label}</Text>
            {showBack && <ArrowRightIcon
                onPress={() => { }}
                size={hp(3)}
                color={bg}
            />}
        </View>
    )
}