import { View, Text, ScrollView, FlatList, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ArrowLeftIcon, ArrowRightIcon } from 'react-native-heroicons/outline'
import { GlbalLocale } from '../../constants/locale'
import HeaderOther from './components/HeaderOther'
import { pcs_portal_all_data } from '../../constants/data'

export default function PCSPortal({ navigation }) {
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
                        label={GlbalLocale.pcs_portal}
                    />
                </View>
                <View className="h-full">
                    <FlatList
                        data={pcs_portal_all_data}
                        columnWrapperStyle={{
                            justifyContent: 'space-between'
                        }}
                        numColumns={2}
                        renderItem={({ item, index }) => (<TouchableOpacity
                            onPress={() => {
                                if (item.screenName) {
                                    navigation.navigate({ name: item.screenName, params: { forSelf: true } })
                                }
                            }}
                            style={{
                                elevation: 5,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 5 },
                                shadowOpacity: 0.5,
                                shadowRadius: 5,
                                marginLeft: wp(3),
                                marginRight: wp(3),
                                marginVertical: hp(0.8)
                            }}
                            className="flex-1 p-5 bg-white items-center justify-center rounded-xl">
                            {item.icon}
                            <Text className="text-center mt-1"
                                style={{
                                    color: THEME_COLORS.textColor,
                                    fontFamily: "Poppins-Medium",
                                    fontSize: hp(1)
                                }}>{item.text}</Text>
                            {item.isEditable && <Text className="py-0.5 px-2 rounded-full text-center"
                                style={{
                                    color: "white",
                                    fontFamily: "Poppins-Medium",
                                    fontSize: hp(0.8),
                                    backgroundColor: THEME_COLORS.PRIMARY_COLOR
                                }}>Edit Submission</Text>}
                        </TouchableOpacity>)}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={
                            <View
                                className="mx-3 my-2"
                            >
                                <TouchableOpacity
                                    onPress={() => { }}
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
                                    >{GlbalLocale.logout}</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    />
                </View>
            </View>
        </View>
    )
}