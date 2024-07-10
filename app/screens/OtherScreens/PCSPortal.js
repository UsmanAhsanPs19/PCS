import { View, Text, ScrollView, FlatList, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ArrowLeftIcon, ArrowRightIcon } from 'react-native-heroicons/outline'
import { GlbalLocale } from '../../constants/locale'
import HeaderOther from './components/HeaderOther'
import { pcs_data_souvenier, pcs_later_part, pcs_portal_all_data, pcs_portal_data, pcs_portal_register_data } from '../../constants/data'
import { postRequest } from '../../helpers/APIRequest'
import { logout_url } from '../../constants/APIEndpoints'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth, setIsAuthorized } from '../../redux/AuthSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import { useIsFocused } from '@react-navigation/native'

export default function PCSPortal({ navigation }) {
    const { user } = useSelector(state => state.AuthStore);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(false)

    async function clearSession() {
        dispatch(setAuth(null));
        dispatch(setIsAuthorized(false));
        await AsyncStorage.clear()
        navigation.reset({
            index: 0,
            routes: [{ name: "Splash" }],
        });
    }

    const signout = () => {
        setIsLoading(true)
        postRequest(logout_url)
            .then(async respoonse => {
                if (respoonse.status) {
                    await clearSession();
                    Toast.show({
                        type: 'success',
                        text1: 'Logout',
                        text2: respoonse.message
                    });
                }
                else
                    Toast.show({
                        type: 'error',
                        text1: 'Logout',
                        text2: respoonse?.message || respoonse.error?.message || "Error while logging out please try again later."
                    });
                setIsLoading(false)
            })
            .catch(error => {
                setIsLoading(false)
                console.log("Error logout: ", error)
            })
    }

    useEffect(() => {
        if (isFocused && user) {
            if (!user.is_conference) {
                setData(pcs_portal_register_data)
            }
            else if (user.is_conference === 1) {
                var filterData = pcs_portal_register_data.filter(item => item.isVisible)
                setData([...filterData, ...pcs_later_part])
            }
            else if (user.is_conference === 2) {
                var filterData = pcs_portal_register_data.filter(item => item.isVisible)

                setData([...filterData, ...pcs_later_part, ...pcs_data_souvenier])
            }
        }
    }, [user, isFocused])

    return (
        <View
            style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
            className="flex-1 pt-10"
        >
            <StatusBar style='dark' />
            <View className="space-y-4 px-4 h-5/6">
                {/* Header for other Screens */}
                <View>
                    <HeaderOther
                        onPress={() => {
                            navigation.goBack()
                        }}
                        label={GlbalLocale.pcs_portal}
                    />
                </View>
                <View className="h-fit">
                    <FlatList
                        data={data}
                        columnWrapperStyle={{
                            justifyContent: 'space-between'
                        }}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        renderItem={({ item, index }) => (<TouchableOpacity
                            onPress={() => {
                                if (item.screenName) {
                                    navigation.navigate({ name: item.screenName, params: { forSelf: item.text === "Other Person Registration" ? false : true } })
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
                    // ListFooterComponent={
                    // }
                    />
                </View>
            </View>
            <View
                className="left-1 right-1 absolute bottom-1 mx-3 my-2"
            >
                <TouchableOpacity
                    onPress={!isLoading && signout}
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
                    >{GlbalLocale.logout}</Text>}
                </TouchableOpacity>
            </View>
        </View>
    )
}