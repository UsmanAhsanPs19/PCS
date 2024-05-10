import { View, Text, Modal } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { XCircleIcon } from 'react-native-heroicons/outline'

export default function PopupMessage({ visible, setVisible, title, message, type, onPress }) {

    return (
        <Modal
            className="items-center justify-center"
            animationType="slide" transparent={true} visible={visible}>
            <View
                style={{
                    elevation: 3,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                }}
                className="bottom-5 absolute h-1/3 w-11/12 self-center p-3 bg-white border rounded-3xl border-gray-400">
                <View className="flex-row self-end">
                    <XCircleIcon
                        color={"red"}
                        size={hp(4)}
                    />
                </View>
            </View>
        </Modal>
    )
}