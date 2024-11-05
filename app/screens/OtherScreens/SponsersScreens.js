import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import HeaderOther from './components/HeaderOther'
import { all_sponsers_url } from '../../constants/APIEndpoints'
import { getRequest } from '../../helpers/APIRequest'

export default function SponsersScreens({ navigation }) {
    const [sponsers, setSponsers] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAllSponsers()
    }, [])

    // Get list of top sponsers
    async function getAllSponsers() {
        setIsLoading(true);
        await getRequest(all_sponsers_url).then(response => {
            console.log("getSponsers Data::", response)
            if (response.status && response.data) {
                setSponsers(response.data)
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
            className="pt-10 px-4 flex-1"
        >
            <StatusBar style='dark' />
            <HeaderOther label='Sponsors' classes="py-3 px-2" onPress={() => {
                console.log("Go back pressed")
                navigation.goBack()
            }} />
            <FlatList
                numColumns={2}
                className="p-1"
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
                contentContainerStyle={{
                    justifyContent: "center"
                }}
                data={sponsers}
                renderItem={({ item, index }) => (
                    <View className="flex-1 justify-center p-2 self-center">
                        {/* {item} */}
                        <Image
                            className=""
                            resizeMode='contain'
                            style={{
                                flex: 1,
                                height: hp('10%'),
                                width: wp('27%')
                            }}
                            source={{ uri: `${item.image}` }}
                        />
                    </View>
                )}
            />
        </View>
    )
}