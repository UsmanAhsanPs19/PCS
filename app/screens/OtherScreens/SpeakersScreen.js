import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import { GlbalLocale } from '../../constants/locale'
import HeaderOther from './components/HeaderOther'
import { speakers_all_data } from '../../constants/data'
import CustomInput from '../../components/CustomInput'
// import { navigation_all_data } from '../../constants/data'


export default function SpeakersScreen({ navigation }) {
    const [search, setSearch] = useState("")
    return (
        <View
            style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
            className="flex-1 pt-10 "
        >
            <StatusBar style='dark' />
            <View className="space-y-4 px-4">
                {/* Header for other Screens */}
                <View>
                    <HeaderOther
                        onPress={() => {
                            navigation.goBack()
                        }}
                        label={GlbalLocale.speakers_label}
                    />
                </View>

                <View >
                    <View className="space-y-2">
                        {/* Description of event */}
                        <View className="">
                            <CustomInput
                                placeholder={GlbalLocale.search}
                                value={search}
                                setValue={setSearch}
                                classes={"my-2"}
                            />
                            <FlatList
                                disableVirtualization
                                data={speakers_all_data}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate({ name: 'SpeakerDetails', params: item })
                                        }}
                                        className="flex-row rounded-xl mb-4"
                                        style={{
                                            elevation: 3,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 3 },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 3,
                                            backgroundColor: THEME_COLORS.PRIMARY_COLOR_DARK
                                        }}
                                    >
                                        {item.image}
                                        <View className="flex-1 p-1 items-center justify-center">
                                            <Text
                                                className={"text-2xl font-bold text-center"}
                                                style={{ color: THEME_COLORS.HALF_WHITE_COLOR, fontFamily: "Poppins-Bold" }}
                                            >
                                                {item.name}
                                            </Text>
                                            <Text
                                                className={"text-base text-center"}
                                                numberOfLines={2}
                                                style={{ color: THEME_COLORS.HALF_WHITE_COLOR, fontFamily: "Poppins-Regular" }}
                                            >
                                                {item.designation}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}