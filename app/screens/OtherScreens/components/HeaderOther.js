import { View, Text, TouchableOpacity, Platform, SafeAreaView } from 'react-native'
import React from 'react'
import { THEME_COLORS } from '../../../constants/colors'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ArrowLeftIcon, ArrowRightIcon } from 'react-native-heroicons/outline';

export default function HeaderOther({ label = "No Label", classes, text_color = THEME_COLORS.PRIMARY_COLOR, onPress, showBack = true, color_arrow = THEME_COLORS.textColor, bg = THEME_COLORS.BG_COLOR }) {
    return (
        <SafeAreaView>
            <View className={`mt-1 flex-row justify-between items-center ${classes}`}
                style={{
                    backgroundColor: bg
                }}
            >
                {showBack &&
                    <TouchableOpacity
                        onPress={onPress}
                    >
                        <ArrowLeftIcon

                            size={hp(2.8)}
                            style={{
                                // backgroundColor: "red"
                            }}
                            color={color_arrow}
                        />
                    </TouchableOpacity>
                }
                <Text
                    className="text-xl text-center mx-3"
                    numberOfLines={1}
                    ellipsizeMode='middle'
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
        </SafeAreaView>
    )
}