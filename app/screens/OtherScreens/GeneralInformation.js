import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import { GlbalLocale } from '../../constants/locale'
import HeaderOther from './components/HeaderOther'
// import { navigation_all_data } from '../../constants/data'
import MapImage from '../../../assets/MapImage'


export default function GeneralInformation({ navigation }) {
    return (
        <ScrollView
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
                        label={GlbalLocale.information_label}
                    />
                </View>

                <View >
                    {/* <PinnedLocation latitude={31.5027} longitude={74.3487} /> */}
                    {/* map component as a  image */}
                    <View className="items-center justify-stretch">
                        <MapImage />
                    </View>
                    <View className="space-y-2">
                        {/* Event Name and Date view */}
                        <View>
                            <Text
                                className={"text-xl font-medium text-center"}
                                style={{ color: THEME_COLORS.textLightGrayColor, fontFamily: "Poppins-SemiBold" }}
                            >
                                CARDIOCON 2024
                            </Text>
                            <Text
                                className={"text-xl font-semibold text-center"}
                                style={{ color: THEME_COLORS.textLightGrayColor, fontFamily: "Poppins-Medium" }}
                            >
                                9-11 Nov, 20244
                            </Text>
                        </View>
                        {/* Venue location name */}
                        <View>
                            <Text
                                className={"text-xl font-medium text-center"}
                                style={{ color: THEME_COLORS.textLightGrayColor, fontFamily: "Poppins-SemiBold" }}
                            >
                                Pearl Continental Hotel, Lahore
                            </Text>
                        </View>
                        {/* Description of event */}
                        <View className="pt-5">
                            <Text
                                className={"text-base font-bold text-justify"}
                                style={{ color: THEME_COLORS.textLightGrayColor, fontFamily: "Poppins-Bold" }}
                            >
                                Dear Colleagues,{"\n\n"}
                                On behalf of the Organizing Committee of the 35th Conference of Pakistan Society of Neurosurgeons (PSN) that will be held from the 11th to the 13th of November 2022 in King Edward Medical University Lahore, Pakistan. We would like to send you our warmest greetings and invite you to participate in this quintessential moot of Pakistani Neurosurgeons.
                                We are working to constitute an attractive scientific program that will cover all subspecialties, and will be inviting speakers of international repute to conduct workshops and grace the conference with their talks. The conference will kick off with pre-conference talks and workshops. Soon, we will send you the final scientific program,
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}