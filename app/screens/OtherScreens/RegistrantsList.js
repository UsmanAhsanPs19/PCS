import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import HeaderOther from './components/HeaderOther'
import { GlbalLocale } from '../../constants/locale'
import { THEME_COLORS } from '../../constants/colors'
import { MEDIA_BASE_URL, getRequest, postRequest } from '../../helpers/APIRequest'
import { get_my_card, get_registrants_api } from '../../constants/APIEndpoints'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Toast from 'react-native-toast-message'

export default function RegistrantsList({ navigation }) {

    const [registratnts_list, setRegistratntsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [indexLoading, setIndexLoading] = useState(false)

    useEffect(() => {
        getRegistratntsList()
    }, [])

    async function getMyRegistrationCard(registration_id) {
        setIndexLoading(registration_id)
        let data = new FormData();
        data.append('registration_id', registration_id);
        postRequest(get_my_card, data, null)
            .then(response => {
                Toast.show({
                    text1: "Entry Card",
                    text2: response.message || response.errror?.message,
                    type: response.status ? "success" : "error",
                    autoHide: true,
                    position: "top"
                })
                setIndexLoading(null)
            }).catch(error => {
                setIndexLoading(null)
                console.log("Error:::get my card:::", error)
            })
    }

    async function getRegistratntsList() {
        setIsLoading(true)
        getRequest(get_registrants_api, null)
            .then(response => {
                console.log("Response get registrants:::", response)
                // Toast.show({
                //     autoHide: true,
                //     text1: "Registration List",
                //     type: response.status? "success" : "error",
                //     text2: response.message || response?.error?.message,
                //     position:"top"
                // })
                setIsLoading(false)
                if (response.status) {
                    setRegistratntsList(response.data || [])
                }
                else {
                    Toast.show({
                        autoHide: true,
                        text1: "Registration List",
                        type: "error",
                        text2: response.message || response?.error?.message,
                        position: "top"
                    })
                }
            }).catch(error => {
                setIsLoading(false)
                console.log("Error Get Registrants:::", error)
            })
    }

    const main_list_item_css = "p-1 border-b-2 border-gray-100 flex justify-evenly items-center flex-row"
    const text_label_values_size = "flex-1 text-left font-medium text-base";
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
                        label={GlbalLocale.registratnts_list}
                    />
                </View>
                {isLoading && <ActivityIndicator className="self-center" color={THEME_COLORS.PRIMARY_COLOR} size={"large"} />}
                <FlatList
                    data={registratnts_list}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View key={index} className="flex space-y-3 border-2 border-gray-200 rounded-lg p-3 mb-3">
                            <View className={main_list_item_css}>
                                <Text
                                    className={text_label_values_size}
                                    style={{
                                        fontFamily: "Poppins-Medium"
                                    }}
                                >ID</Text>
                                <Text
                                    className={text_label_values_size}
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >{item?.id}</Text>
                            </View>
                            <View className={main_list_item_css}>
                                <Text
                                    className={text_label_values_size}
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >Profile Picture</Text>
                                <Image
                                    resizeMode='contain'
                                    className="flex-1 mb-2 "
                                    style={{
                                        width: wp('20%'),
                                        height: wp('20%')
                                    }}
                                    source={{
                                        uri: item?.profile_picture && `${MEDIA_BASE_URL}/${item?.profile_picture}`
                                    }}
                                />
                            </View>
                            <View className={main_list_item_css}>
                                <Text
                                    className={text_label_values_size}
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >First Name</Text>
                                <Text
                                    className={text_label_values_size}
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >{item?.first_name}</Text>
                            </View>
                            <View className={main_list_item_css}>
                                <Text
                                    className={text_label_values_size}
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >Last Name</Text>
                                <Text
                                    className={text_label_values_size}
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >{item?.last_name || "N/A"}</Text>
                            </View>

                            <View className={main_list_item_css}>
                                <Text
                                    className={text_label_values_size}
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >CNIC</Text>
                                <Text
                                    className={text_label_values_size}
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >{item?.cnic}</Text>
                            </View>
                            {/* RegistrantsDetails */}
                            <View className={main_list_item_css}>
                                <Text
                                    className={text_label_values_size}
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >Detail</Text>
                                {/* <Text
                                    className={text_label_values_size}
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >Check Details</Text> */}
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate({ name: "RegistrantsDetails", params: { data: item } })
                                    }}
                                    className="flex-1 my-2 w-full p-2 items-center justify-center self-center rounded-lg"
                                    style={{
                                        backgroundColor: THEME_COLORS.PRIMARY_COLOR
                                    }}
                                >
                                    <Text
                                        className="text-white"
                                        style={{
                                            fontFamily: "Poppins-Regular"
                                        }}
                                    >{GlbalLocale.check_details}</Text>
                                </TouchableOpacity>
                            </View>
                            <View className={main_list_item_css}>
                                <Text
                                    className={text_label_values_size}
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >Amount</Text>
                                <Text
                                    className={text_label_values_size}
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >{item?.amount ? item?.amount + " - PKR" : "N/A"}</Text>
                            </View>

                            <View className={main_list_item_css}>
                                <Text
                                    className={text_label_values_size}
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >Payment Status</Text>
                                <View className="flex-1">{item.status ? <Text
                                    className={text_label_values_size}
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >Paid</Text> : <View className="items-center justify-center">
                                    <Text
                                        className={text_label_values_size}
                                        style={{
                                            fontFamily: "Poppins-Regular"
                                        }}
                                    >UnPaid</Text>
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
                                        >{GlbalLocale.pay_now}</Text>
                                    </TouchableOpacity>
                                </View>}</View>
                            </View>
                            <View className={main_list_item_css}>
                                <Text
                                    className={text_label_values_size}
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >Status</Text>
                                <Text
                                    className={text_label_values_size}
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >{item.payment_status === 0 ? "Payment in Review"
                                    : item.payment_status === 1 ? "Approved" :
                                        item.payment_status === 2 ? "Rejected" : "Pending"
                                    }</Text>
                            </View>
                            <View className={`${main_list_item_css} border-b-0`}>
                                <Text
                                    className={text_label_values_size}
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >Entry Card</Text>
                                {/* {item.status === 1 && item.payment_status === 1 &&  */}
                                <TouchableOpacity
                                    onPress={() => getMyRegistrationCard(item.id)}
                                    disabled={indexLoading}
                                    className="flex-1 my-2 w-full p-2 items-center justify-center self-center rounded-lg"
                                    style={{
                                        backgroundColor: THEME_COLORS.PRIMARY_COLOR
                                    }}
                                >{indexLoading ? <ActivityIndicator color={"white"} size={"small"} />
                                    : <Text
                                        className="text-white"
                                        style={{
                                            fontFamily: "Poppins-Regular"
                                        }}
                                    >{GlbalLocale.entry_card}</Text>}
                                </TouchableOpacity>
                                {/* } */}
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={
                        !isLoading && <View className="justify-center items-center">
                            <Text
                                className="text-base text-gray-400"
                                style={{
                                    fontFamily: "Poppins-Medium"
                                }}
                            >You haven't registered any user yet.</Text>
                        </View>
                    }
                />
            </View>
        </View>
    )
}