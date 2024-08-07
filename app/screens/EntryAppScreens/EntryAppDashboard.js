import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { GlbalLocale } from '../../constants/locale'
import { postRequest } from '../../helpers/APIRequest'
import { logout_url } from '../../constants/APIEndpoints'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth, setIsAuthorized } from '../../redux/AuthSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import { useIsFocused } from '@react-navigation/native'
import HeaderOther from '../OtherScreens/components/HeaderOther'
import { entry_app_data } from '../../constants/data'

export default function EntryAppDashboard({ navigation }) {
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
                        showBack={false}
                        onPress={() => {
                            navigation.goBack()
                        }}

                        label={GlbalLocale.event_entry_portal}
                    />
                </View>
                <View className="h-fit">
                    <FlatList
                        data={entry_app_data}
                        columnWrapperStyle={{
                            justifyContent: 'space-between'
                        }}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        renderItem={({ item, index }) => (<TouchableOpacity
                            onPress={() => {
                                if (item.screenName) {
                                    navigation.navigate({ name: item.screenName, params: { label: item.text } })
                                }
                            }}
                            style={{
                                elevation: 3,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.2,
                                shadowRadius: 2,
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
                                    fontSize: hp(1.2)
                                }}>{item.text}</Text>
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