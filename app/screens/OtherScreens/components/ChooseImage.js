import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { GlbalLocale } from '../../../constants/locale'
import { THEME_COLORS } from '../../../constants/colors'
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';

export default function ChooseImage({ heading = null, setPickedImage, picked_image }) {

    async function openImagePicker() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setPickedImage(result.assets[0])
        }
        else {
            Toast.show({
                text1: "Pick Image",
                text2: "User cancelled the process",
                type: "error",
                text1Style: {
                    fontFamily: "Poppins-Regular"
                },
                text2Style: {
                    fontFamily: "Poppins-Regular"
                }
            })
        }
    }

    return (
        <View>
            {heading && <Text
                className=" text-left"
                style={{
                    color: THEME_COLORS.textLightGrayColor,
                    fontFamily: "Poppins-Medium"
                }}
            >{heading}</Text>}
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