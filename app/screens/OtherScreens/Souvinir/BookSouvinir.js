import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { get_souvinir, save_souvinir_booking } from '../../../constants/APIEndpoints';
import { getRequest, postRequest } from '../../../helpers/APIRequest';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { THEME_COLORS } from '../../../constants/colors';
import { GlbalLocale } from '../../../constants/locale';
import HeaderOther from '../components/HeaderOther';

export default function BookSouvinir({ navigation }) {
    const [souvinir_list, setSouvinirList] = useState([]);
    const [selected_sounenir, setSelectedSouvenir] = useState(null);
    const [booked_souvinir, setBookedSouvinir] = useState([]);
    const [is_booked, setIsBooked] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    // Get profession and make a selection dropdown
    useEffect(() => {
        getSouvinir()
    }, [])

    async function getSouvinir() {
        await getRequest(get_souvinir)
            .then((response) => {
                console.log("getSouvinir Data::", response);
                if (response.status) {
                    setSouvinirList(response?.souvinirs_list)
                    if (response.booked_souvinir?.id) {
                        setBookedSouvinir(response?.booked_souvinir)
                        setIsBooked(true);
                    }
                    else {
                        setIsBooked(false);
                    }
                }
                else {
                    Toast.show({
                        text1: "Souvinir",
                        autoHide: true,
                        position: "top",
                        type: "error",
                        text2: response.message || response?.error?.message || "Some issue while getting souvenir."
                    })
                }
            })
            .catch((error) => {
                console.log("getSouvinir Error:::", error);
            });
    }

    async function postSounvenir() {

        // console.log("Souvenir id:", souvinir_list[selected_sounenir]?.id)

        setIsLoading(true)
        let data = new FormData();
        data.append("souvinir_id", souvinir_list[selected_sounenir]?.id);
        postRequest(save_souvinir_booking, data, null)
            .then(response => {
                console.log("Response:::Save souvenir::", response)
                navigation.goBack()
                if (response.status) {
                    Toast.show({
                        text1: "Souvinir Booked",
                        autoHide: true,
                        position: "top",
                        type: "success",
                        text2: response.message
                    })
                } else {
                    Toast.show({
                        text1: "Save Souvinir",
                        autoHide: true,
                        position: "top",
                        type: "error",
                        text2: response.message || response?.error?.message || "Some issue while saving souvenir."
                    })
                }
                setIsLoading(false)
            }).catch(error => {
                console.log("Error::::", error)
                setIsLoading(false)
            })
    }

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
                            if (!isLoading)
                                navigation.goBack()
                        }}
                        label={GlbalLocale.book_your_sounenir}
                    />
                </View>
                <Text
                    className={"my-4 text-sm text-center font-medium space-y-2"}
                    style={{ color: !is_booked ? THEME_COLORS.textLightGrayColor : THEME_COLORS.textColor, fontFamily: "Poppins-Medium" }}
                >{is_booked ? GlbalLocale.booked_souvenir : GlbalLocale.select_souvenir}
                </Text>

                {/* List of souvenir */}
                {!is_booked && <FlatList
                    className=""
                    data={souvinir_list}
                    numColumns={2}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedSouvenir(index)
                            }}
                            className={`mb-5 ${selected_sounenir === index ? "border-red-500 border-10 rounded-xl" : "border-gray-200"} border-4 m-3`}
                            key={index}
                        >
                            <Image
                                resizeMode='contain'
                                className="mb-2"
                                style={{
                                    width: wp('39%'),
                                    height: hp('19%')
                                }}
                                source={{
                                    uri: `${item.image}`
                                }}
                            />
                        </TouchableOpacity>
                    )}
                    ListFooterComponent={
                        <View
                            className="mx-3 my-2"
                        >
                            {souvinir_list.length > 0 && <TouchableOpacity
                                onPress={!isLoading && postSounvenir}
                                className="my-2 w-full p-2 items-center justify-center self-center rounded-lg"
                                style={{
                                    backgroundColor: THEME_COLORS.PRIMARY_COLOR
                                }}
                            >
                                {isLoading ? <ActivityIndicator color={"white"} size={"large"} /> : <Text
                                    className="text-white"
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >{GlbalLocale.book}</Text>}
                            </TouchableOpacity>}
                        </View>
                    }
                />}
                {souvinir_list.length && <View className="justify-center items-center">
                    <Image
                        resizeMode='contain'
                        className="mb-2"
                        style={{
                            width: wp('80%'),
                            height: hp('50%')
                        }}
                        source={{
                            uri: `${souvinir_list.filter(s => s.id === booked_souvinir.id)[0]?.image}`
                        }}
                    />
                </View>}
            </View>
        </View>
    )
}