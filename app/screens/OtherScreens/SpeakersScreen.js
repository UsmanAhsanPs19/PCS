import { View, Text, ScrollView, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import { GlbalLocale } from '../../constants/locale'
import HeaderOther from './components/HeaderOther'
import { speakers_all_data } from '../../constants/data'
import CustomInput from '../../components/CustomInput'
import { all_speakers_url } from '../../constants/APIEndpoints'
import { MEDIA_BASE_URL, getRequest } from '../../helpers/APIRequest'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
// import { navigation_all_data } from '../../constants/data'


export default function SpeakersScreen({ navigation }) {
    const [search, setSearch] = useState("")
    const [speakers, setSpeakers] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAllSpeakers()
    }, [])

    // Get list of top sponsers
    async function getAllSpeakers() {
        setIsLoading(true);
        await getRequest(all_speakers_url).then(response => {
            console.log("getAllSponsers Data::", response)
            if (response.status && response.data) {
                setSpeakers(response.data)
            }
            setIsLoading(false)
        }).catch(error => {
            console.log("getSponsers Error:::", error)
            setIsLoading(false)
        })
    }

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
                                ListHeaderComponent={
                                    isLoading && <View className="space-y-1 my-2 flex justify-center items-center">
                                        <ActivityIndicator color={THEME_COLORS.PRIMARY_DARK} size={"large"} />
                                        <Text
                                            style={{
                                                color: THEME_COLORS.GRAY_TEXT,
                                                fontFamily: "Poppins-Regular"
                                            }}>Please wait...</Text>
                                    </View>
                                }
                                data={speakers}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity

                                        onPress={() => {
                                            navigation.navigate({ name: 'SpeakerDetails', params: item })
                                        }}
                                        className="flex-row rounded-xl mb-4"
                                        style={{
                                            height: hp('13%'),
                                            elevation: 3,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 3 },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 3,
                                            backgroundColor: THEME_COLORS.PRIMARY_COLOR_DARK
                                        }}
                                    >
                                        <Image
                                            className="rounded-l-xl"
                                            style={{
                                                height: "100%",
                                                width: wp('25%')
                                            }}
                                            source={{ uri: `${MEDIA_BASE_URL}/${item.image}` }}
                                        />
                                        {/* {item.image} */}
                                        <View className="flex-1 p-1 items-center justify-center">
                                            <Text
                                                className={"text-xl font-bold text-center"}
                                                style={{ color: THEME_COLORS.HALF_WHITE_COLOR, fontFamily: "Poppins-Bold" }}
                                            >
                                                {item.name}({item.country})
                                            </Text>
                                            <Text
                                                className={"text-base text-center"}
                                                numberOfLines={2}
                                                style={{ color: THEME_COLORS.HALF_WHITE_COLOR, fontFamily: "Poppins-Regular" }}
                                            >
                                                {item.tagline}
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