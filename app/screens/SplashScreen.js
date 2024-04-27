import { ActivityIndicator, View } from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppIcon from '../../assets/AppIcon';
import { useNavigation } from '@react-navigation/native';
import { THEME_COLORS } from '../constants/colors';


export default function SplashScreen() {

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            // toggleColorScheme()
            navigation.replace("Login")
        }, 2500)
    }, [])

    // const base64Svg = base64Encode(SplashBg());
    return (
        <View
            style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
            className="flex-1 items-center justify-center py-20 flex-col"
        >
            <StatusBar style={'light'} />
            {/* app logo image */}
            <View>
                <AppIcon />
                <ActivityIndicator size={"large"} color={THEME_COLORS.PRIMARY_COLOR} className="my-5" />
            </View>

        </View>
    );
}