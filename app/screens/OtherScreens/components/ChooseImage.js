import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { GlbalLocale } from '../../../constants/locale'
import { THEME_COLORS } from '../../../constants/colors'

export default function ChooseImage({ openImagePicker, picked_image }) {
    return (
        <View>
            <View className="border rounded-lg flex-row justify-evenly"
                style={{
                    borderColor: THEME_COLORS.BORDER_COLOR
                }}
            >
                <TouchableOpacity
                    onPress={openImagePicker}
                    className="items-center justify-center flex-1 px-3 py-4 bg-gray-100">
                    <Text
                        className="text-sm text-center"
                        style={{
                            fontFamily: "Poppins-Regular",
                            color: THEME_COLORS.TEXT_LIGHT_BLACK
                        }}
                    >{GlbalLocale.choose_image}</Text>
                </TouchableOpacity>
                <View className="flex-1 py-4 px-3">
                    <Text
                        className="text-sm text-center"
                        numberOfLines={1}
                        ellipsizeMode='middle'
                        style={{
                            fontFamily: "Poppins-Regular",
                            color: THEME_COLORS.TEXT_LIGHT_BLACK
                        }}
                    >{picked_image?.uri || GlbalLocale.no_image}</Text>
                </View>
            </View>
        </View>
    )
}