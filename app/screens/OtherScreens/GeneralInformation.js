import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Linking, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import { GlbalLocale } from '../../constants/locale'
import HeaderOther from './components/HeaderOther'
// import { navigation_all_data } from '../../constants/data'
import MapImage from '../../../assets/MapImage'
import { event_information } from '../../constants/APIEndpoints'
import { getRequest } from '../../helpers/APIRequest'


export default function GeneralInformation({ navigation }) {

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getInformation()
    }, [])

    // Get information
    async function getInformation() {
        setIsLoading(true);
        await getRequest(event_information).then(response => {
            console.log("getInformation Data::", JSON.stringify(response))
            if (response.status && response.data) {
                setData(response.data)
            }
            setIsLoading(false)
        }).catch(error => {
            console.log("getInformation Error:::", error)
            setIsLoading(false)
        })
    }

    const openGoogleMaps = () => {
        const url = data.pin_location;

        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert("Error", "Google Maps app is not installed or the location url is not supported.");
                }
            })
            .catch((err) => console.error("An error occurred", err));
    };

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
                {
                    isLoading &&
                    <ActivityIndicator
                        color={THEME_COLORS.PRIMARY_COLOR}
                        size={"large"}
                        className="self-center"
                    />
                }
                <View >
                    {/* <PinnedLocation latitude={31.5027} longitude={74.3487} /> */}
                    {/* map component as a  image */}
                    <TouchableOpacity
                        onPress={openGoogleMaps}
                        className="items-center justify-stretch">
                        <MapImage style={{ transform: [{ rotate: Platform.OS === "ios" ? '180deg' : "0deg" }] }} />
                    </TouchableOpacity>
                    <View className="space-y-2">
                        {/* Event Name and Date view */}
                        <View>
                            <Text
                                className={"text-xl font-medium text-center"}
                                style={{ color: THEME_COLORS.textLightGrayColor, fontFamily: "Poppins-SemiBold" }}
                            >
                                {data?.title}
                            </Text>
                            <Text
                                className={"text-xl font-semibold text-center"}
                                style={{ color: THEME_COLORS.textLightGrayColor, fontFamily: "Poppins-Medium" }}
                            >
                                {data?.date}
                            </Text>
                        </View>
                        {/* Venue location name */}
                        <View>
                            <Text
                                className={"text-xl font-medium text-center"}
                                style={{ color: THEME_COLORS.textLightGrayColor, fontFamily: "Poppins-SemiBold" }}
                            >
                                {data?.location}
                            </Text>
                        </View>
                        {/* Description of event */}
                        <View className="pt-5">
                            <Text
                                className={"text-base font-bold text-justify"}
                                style={{ color: THEME_COLORS.textLightGrayColor, fontFamily: "Poppins-Bold" }}
                            >
                                {data?.data}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}