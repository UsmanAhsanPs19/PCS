import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
// import { tailwind } from 'tailwindcss-react-native'; // Ensure tailwindcss-react-native is properly set up

const CModalComponent = () => {
    const [modalVisible, setModalVisible] = useState(true);

    return (
        <View classname={'flex-1 items-center justify-center'}>
            <TouchableOpacity
                classname={'bg-blue-500 p-4 rounded-lg'}
                onPress={() => setModalVisible(true)}
            >
                <Text classname={'text-white text-lg'}>Show Modal</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text classname={'text-lg mb-4'}>Hello, I'm a Modal!</Text>
                        <TouchableOpacity
                            classname={'bg-red-500 p-2 rounded-lg'}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text classname={'text-white text-lg'}>Close Modal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
});

export default CModalComponent;
