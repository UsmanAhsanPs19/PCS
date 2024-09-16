import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import HeaderOther from './components/HeaderOther'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'


const main_list_item_css = "p-1 flex justify-evenly items-center flex-row"
const text_label_values_size = "flex-1 text-left font-medium text-base";

export default function RegistrantDetails({ navigation, route }) {
    const { data } = route.params
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
                        label={(data?.first_name || data?.last_name) ? `${data?.title || ""} ${data?.first_name} ${data?.last_name || ""}` : "No Name"}
                    />
                </View>
                <ScrollView>
                    <View className="flex space-y-2  p-3 mb-3">
                        <View className="justify-center self-center items-center">
                            <Image
                                resizeMode='contain'
                                className="mb-2 rounded-2xl"
                                style={{
                                    width: wp('40%'),
                                    height: wp('40%')
                                }}
                                source={{
                                    uri: data?.profile_picture && `${data?.profile_picture}`
                                }}
                            />
                        </View>

                        {/* <View className={main_list_item_css}>
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
                                uri: data?.file && `${data?.file}`
                            }}
                        />
                    </View> */}
                        <View className={main_list_item_css}>
                            <Text
                                className={text_label_values_size}
                                style={{
                                    fontFamily: "Poppins-Regular"
                                }}
                            >Name</Text>
                            <Text
                                className={text_label_values_size}
                                style={{
                                    fontFamily: "Poppins-Regular"
                                }}
                            >{`${data?.title || ""} ${data?.first_name} ${data?.last_name || ""}`}</Text>
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
                            >{data?.cnic}</Text>
                        </View>

                        <View className={main_list_item_css}>
                            <Text
                                className={text_label_values_size}
                                style={{
                                    fontFamily: "Poppins-Regular"
                                }}
                            >Phone number</Text>
                            <Text
                                className={text_label_values_size}
                                style={{
                                    fontFamily: "Poppins-Regular"
                                }}
                            >{data?.phone_number}</Text>
                        </View>

                        <View className={main_list_item_css}>
                            <Text
                                className={text_label_values_size}
                                style={{
                                    fontFamily: "Poppins-Medium"
                                }}
                            >Email</Text>
                            <Text
                                className={text_label_values_size}
                                style={{
                                    fontFamily: "Poppins-Regular"
                                }}
                            >{data?.email}</Text>
                        </View>
                        <View className={main_list_item_css}>
                            <Text
                                className={text_label_values_size}
                                style={{
                                    fontFamily: "Poppins-Medium"
                                }}
                            >Profession</Text>
                            <Text
                                className={text_label_values_size}
                                style={{
                                    fontFamily: "Poppins-Regular"
                                }}
                            >{data?.profession}</Text>
                        </View>
                        {data?.profession == ("Doctor" || "Nurse") && <View className={main_list_item_css}>
                            <Text
                                className={text_label_values_size}
                                style={{
                                    fontFamily: "Poppins-Medium"
                                }}
                            >{data?.profession === "Doctor" ? "PMDC" : "PMNC"}</Text>
                            <Text
                                className={text_label_values_size}
                                style={{
                                    fontFamily: "Poppins-Regular"
                                }}
                            >{data?.pmdc || data?.pmnc || "N/A"}</Text>
                        </View>}
                        <View className="h-0.5 bg-gray-200" />
                        <View className={main_list_item_css}>
                            <Text
                                className={text_label_values_size}
                                style={{
                                    fontFamily: "Poppins-Regular"
                                }}
                            >Registration Type</Text>
                            <Text
                                className={text_label_values_size}
                                style={{
                                    fontFamily: "Poppins-Regular"
                                }}
                            >{data?.name || "PGs/Residents (A letter of PG ship from concerned HOD will be required)"}</Text>
                        </View>
                        <View className={main_list_item_css}>
                            <Text
                                className={text_label_values_size}
                                style={{
                                    fontFamily: "Poppins-Regular"
                                }}
                            >Promo Code</Text>
                            <View className="flex-1">
                                <Text
                                    className={text_label_values_size}
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >{data?.promo_code || "N/A"}</Text>
                            </View>
                        </View>
                        <View className="h-0.5 bg-gray-200" />

                        <View className={main_list_item_css}>
                            <Text
                                className={text_label_values_size}
                                style={{
                                    fontFamily: "Poppins-Regular"
                                }}
                            >Payment Proof</Text>
                            <Image
                                resizeMode='contain'
                                className="flex-1 mb-2 rounded-2xl"
                                style={{
                                    width: wp('20%'),
                                    height: wp('20%')
                                }}
                                source={{
                                    uri: data?.file && `${data?.file}`
                                }}
                            />
                        </View>
                        <View className="h-0.5 bg-gray-200" />
                        {/* <View className={`${main_list_item_css} border-b-0`}>
                        <Text
                            className={text_label_values_size}
                            style={{
                                fontFamily: "Poppins-Regular"
                            }}
                        >Entry Card</Text>
                        <Text
                            className={text_label_values_size}
                            style={{
                                fontFamily: "Poppins-Regular"
                            }}
                        ></Text>
                    </View> */}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}