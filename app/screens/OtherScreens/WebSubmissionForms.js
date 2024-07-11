import { View, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import HeaderOther from './components/HeaderOther'
import { BASE_PATH } from '../../helpers/APIRequest'
import WebView from 'react-native-webview'

export default function WebSubmissionForms({ navigation, route }) {
    console.log("Route:::", route)
    const { path, title } = route.params;
    console.log("URL:::", BASE_PATH + `${path}`)
    const [loading, setLoading] = useState(true);
    return (
        <View
            style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
            className="flex-1 pt-10"
        >
            <StatusBar style='dark' />
            <View className="space-y-4 h-full">
                {/* Header for other Screens */}
                <View className="px-4">
                    <HeaderOther
                        onPress={() => {
                            navigation.goBack()
                        }}
                        label={title}
                    />
                </View>

                {/* Webview and loading */}

                {loading && (
                    <ActivityIndicator
                        color={THEME_COLORS.PRIMARY_COLOR}
                        size="large"
                    />
                )}
                <WebView
                    source={{ uri: BASE_PATH + `${path}` }}
                    onLoad={() => setLoading(false)}
                    onError={() => setLoading(false)}
                    onNavigationStateChange={(navState) => {
                        //your code goes here 
                        if (navState.url !== BASE_PATH + `${path}`) {
                            navigation.goBack();
                        }
                    }}
                    className="flex-1s h-full w-full"
                />
            </View>
        </View>
    )
}