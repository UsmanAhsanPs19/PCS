import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import { GlbalLocale } from '../../constants/locale'
import HeaderOther from './components/HeaderOther'
import { navigation_all_data } from '../../constants/data'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
import { postRequest } from '../../helpers/APIRequest'
import { delete_account } from '../../constants/APIEndpoints'
import { setAuth, setIsAuthorized } from '../../redux/AuthSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function NavigationPortal({ navigation }) {
    const { isAuthorized, user } = useSelector((state) => state?.AuthStore);
    const [isLoading, setIsLoadin] = useState(false)
    const dispatch = useDispatch();

    async function clearSession() {
        await AsyncStorage.clear()
        navigation.reset({
            index: 0,
            routes: [{ name: "Splash" }],
        });
        dispatch(setAuth(null));
        dispatch(setIsAuthorized(false));
    }

    function deleteAccount() {
        let data = new FormData();
        data.append('email', user?.email);
        // data.append('email', "faranab205@ikangou.com")
        setIsLoadin(true)
        postRequest(delete_account, data)
            .then(response => {
                console.log("Response:::", response)
                if (response.status) {
                    clearSession();
                }
                Toast.show({
                    text1: "Delete Account",
                    text2: response.message || response?.error?.message || "There is some error whle deleteing user",
                    position: "top",
                    type: response.status ? "success" : "error",
                    autoHide: true
                })
                setIsLoadin(false)
            }).catch(error => {
                setIsLoadin(false)
                console.log("Error:::", error)
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
                            navigation.goBack()
                        }}
                        showBack={true}
                        label={GlbalLocale.navigation_label}
                    />
                </View>
                <View className="h-full">
                    {
                        isLoading === true && <ActivityIndicator size={"large"} color={THEME_COLORS.PRIMARY_COLOR} className="self-center" />
                    }
                    <FlatList
                        data={navigation_all_data}
                        renderItem={({ item, index }) =>
                            item.name === "Delete Account" && isAuthorized
                                ?
                                (
                                    <TouchableOpacity
                                        onPress={() => {
                                            Alert.alert("Delete Account", "Are you sure you want to delete account?", [
                                                {
                                                    text: "Delete",
                                                    style: "cancel",
                                                    onPress: () => {
                                                        deleteAccount()
                                                    }
                                                },
                                                {
                                                    text: "Dismiss",
                                                    style: "default"
                                                }
                                            ])
                                        }}
                                        className="mb-4 p-5 rounded-xl"
                                        style={{
                                            backgroundColor: THEME_COLORS.PRIMARY_DARK
                                        }}
                                    >
                                        <Text
                                            className="text-white text-base"
                                            style={{
                                                fontFamily: "Poppins-Regular"
                                            }}
                                        >{item?.name}</Text>
                                    </TouchableOpacity>
                                ) :
                                (
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (item.screenName === "RegisterForConference" && !isAuthorized) {
                                                Toast.show({
                                                    text1: "Not authorized",
                                                    text2: "Please login first to register in conference",
                                                    type: "error",
                                                    autoHide: true
                                                })
                                            }
                                            else if (item.screenName) {
                                                navigation.navigate(item.screenName)
                                            }
                                            else if (item.name === "Delete Account") {
                                                Alert.alert("Delete Account", "Are you sure you want to delete account?", [
                                                    {
                                                        text: "Delete",
                                                        style: "cancel",
                                                        onPress: () => { }
                                                    },
                                                    {
                                                        text: "Dismiss",
                                                        style: "default"
                                                    }
                                                ])
                                            }
                                        }}
                                        className="mb-4 p-5 rounded-xl"
                                        style={{
                                            backgroundColor: THEME_COLORS.PRIMARY_DARK
                                        }}
                                    >
                                        <Text
                                            className="text-white text-base"
                                            style={{
                                                fontFamily: "Poppins-Regular"
                                            }}
                                        >{item?.name}</Text>
                                    </TouchableOpacity>)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </View>
    )
}