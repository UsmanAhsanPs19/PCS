import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import HeaderOther from './components/HeaderOther'
import { sponers_data_big } from '../../constants/data'

export default function SponsersScreens({ navigation }) {
    return (
        <View
            style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
            className="pt-10 px-4 flex-1"
        >
            <StatusBar style='dark' />
            <HeaderOther label='Sponers' classes="py-3" showBack onPress={() => navigation.goBack()} />
            <FlatList
                numColumns={2}
                className="p-1"
                contentContainerStyle={{
                    justifyContent: "center"
                }}
                data={sponers_data_big}
                renderItem={({ item, index }) => (
                    <View className="flex-1 p-2 self-center">
                        {item}
                    </View>
                )}
            />
        </View>
    )
}