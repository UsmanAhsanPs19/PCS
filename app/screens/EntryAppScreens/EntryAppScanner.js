import { View, Text, StyleSheet, Button, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { CameraView, useCameraPermissions } from 'expo-camera';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import HeaderOther from '../OtherScreens/components/HeaderOther';
import { StatusBar } from 'expo-status-bar';
import { GlbalLocale } from '../../constants/locale';
import { THEME_COLORS } from '../../constants/colors';
import CustomInput from '../../components/CustomInput';
import { postRequest } from '../../helpers/APIRequest';
import { check_entry_api, mark_entry_api, mark_exit_api, mark_meal_entry_api } from '../../constants/APIEndpoints';
import { entry_app_data } from '../../constants/data';

export default function EntryAppScanner({ navigation, route }) {
    const [facing, setFacing] = useState('back');
    const [cnic, setCNIC] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [permission, requestPermission] = useCameraPermissions();
    const { label } = route?.params || {};

    if (!permission?.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the QR scanner</Text>
                <Button onPress={requestPermission} title="Grant permission" />
            </View>
        );
    }

    function getSearchResult(_cnic = nnull) {
        setIsLoading(true)
        let data = new FormData();
        data.append("cnic", _cnic);
        let api_endpoint = "";
        if (label === entry_app_data[0].text) {
            api_endpoint = mark_entry_api
        }
        else if (label === entry_app_data[1].text) {
            api_endpoint = mark_exit_api
        }
        else if (label === entry_app_data[2].text) {
            api_endpoint = mark_meal_entry_api
        }
        else {
            api_endpoint = check_entry_api
        }
        console.log("API: ", api_endpoint)
        postRequest(api_endpoint, data)
            .then(response => {
                setIsLoading(false)
                console.log("response::", response)
                if (response.status === 1) {
                    // EntryUserDetails
                    navigation.navigate({ name: "EntryUserDetails", params: { data: response?.data || {}, label } })
                }
                else {
                    navigation.navigate({ name: "ErrorScreen", params: { message: response?.message || response?.error?.message || "There are some issue please try again later." } })
                }
            })
            .catch(error => {
                setIsLoading(false)
                console.log("Error:::", error)
            })
    }


    function validateAndCall() {
        let isValid = true;
        let tempError = { ...errors };
        if (!cnic) {
            tempError = { ...tempError, cnic: 'CNIC field is required' };
            isValid = false;
        }
        setErrors(tempError)
        return isValid
    }

    return (
        <View
            style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
            className="flex-1 pt-10"
        >
            <StatusBar style='dark' />
            <View className="space-y-4 px-4">
                <View>
                    <HeaderOther
                        showBack={true}
                        onPress={() => {
                            navigation.goBack()
                        }}
                        label={label}
                    />
                </View>
                <View style={styles.container}
                    className="space-y-4"
                >
                    <View
                        className="space-y-2"
                    >
                        <View>
                            <Text
                                className="text-base text-center"
                                // numberOfLines={1}
                                ellipsizeMode='middle'
                                style={{
                                    fontFamily: "Poppins-Medium",
                                    color: THEME_COLORS.textColor
                                }}
                            >{"Search Entry Throught CNIC"}</Text>
                        </View>
                        <View>
                            {/* CNIC Input */}
                            <CustomInput
                                placeholder={GlbalLocale.cnic + " (without dashes)"}
                                value={cnic}
                                setValue={setCNIC}
                                name='cnic'
                                keyboardType='numeric'
                                error={errors.cnic}
                                classes={"my-2"}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    if (validateAndCall()) {
                                        // navigation.navigate("ErrorScreen")
                                        getSearchResult(cnic)
                                    }
                                }}
                                disabled={isLoading}
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
                                >{GlbalLocale.search}</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        className="space-y-2"
                    >
                        <View>
                            <Text
                                className="text-xl text-center"
                                // numberOfLines={1}
                                ellipsizeMode='middle'
                                style={{
                                    fontFamily: "Poppins-Bold",
                                    color: THEME_COLORS.PRIMARY_COLOR
                                }}
                            >{"Scan QR code"}</Text>
                        </View>
                        <View>
                            {isLoading && <ActivityIndicator
                                className="self-center"
                                color={THEME_COLORS.PRIMARY_COLOR} size={"large"} />}
                            {!isLoading && <CameraView style={styles.camera} facing={facing}
                                onBarcodeScanned={(result) => {
                                    let data = result.data;
                                    if (data && !Number.isNaN(data)) {
                                        getSearchResult(data)
                                    }
                                }}
                                barcodeScannerSettings={{
                                    barcodeTypes: ["qr"],
                                }}
                            >
                            </CameraView>}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        width: widthPercentageToDP('92%'),
        height: heightPercentageToDP('40%'),
        alignSelf: "center"
    },
});