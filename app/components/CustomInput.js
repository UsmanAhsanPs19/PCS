import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from 'react-native-heroicons/outline'
import { THEME_COLORS } from '../constants/colors';

export default function CustomInput({ name = "", classes, value = "", setValue, style, placeholder = "", isSecured = false, error = null }) {
    const [secure, setSecure] = useState(isSecured);
    return (
        <View>
            <View className={`flex-row border rounded-lg p-3 space-x-2 items-center justify-between ${classes}`}
                style={[style, { borderColor: error ? "red" : THEME_COLORS.BORDER_COLOR }]}
            >
                <View className={`w-4/5 flex-row space-x-2 items-center`}>
                    {name === "email" && <EnvelopeIcon size={hp(3)}

                        color={THEME_COLORS.ICON_COLOR} />}
                    {name === "password" && <LockClosedIcon size={hp(3)}
                        color={THEME_COLORS.ICON_COLOR} />}
                    {name === "username" && <UserIcon size={hp(3)}
                        color={THEME_COLORS.ICON_COLOR} />}
                    <TextInput
                        className={`flex-1`}
                        value={value}
                        onChangeText={text => {
                            setValue(text)
                        }}
                        keyboardType='default' //phone-pad, numeric, default, email-address
                        cursorColor={THEME_COLORS.PRIMARY_COLOR}
                        secureTextEntry={secure}
                        placeholder={placeholder}
                        placeholderTextColor={THEME_COLORS.PLACEHOLDER_COLOR}
                        style={{ fontFamily: "Poppins-Regular" }}
                    />
                </View>
                {isSecured && <TouchableOpacity onPress={() => setSecure(prev => !prev)}>{!secure ? <EyeIcon
                    color={THEME_COLORS.ICON_COLOR} /> : <EyeSlashIcon
                    color={THEME_COLORS.ICON_COLOR} />}</TouchableOpacity>}
            </View>
            {error && <Text style={{ fontFamily: "Poppins-Light", color: "red" }}>{error}</Text>}
        </View>
    )
}