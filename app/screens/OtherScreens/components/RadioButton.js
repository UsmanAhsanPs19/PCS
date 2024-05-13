import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { THEME_COLORS } from '../../../constants/colors';

const RadioButton = ({ options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = (option) => {
        setSelectedOption(option);
        onSelect(option);
    };

    return (
        <View className="my-2">
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.radioButton}
                    onPress={() => handleSelect(option)}
                >
                    <View style={{ ...styles.radioButtonCircle, borderColor: selectedOption === option ? THEME_COLORS.PRIMARY_COLOR : THEME_COLORS.TEXT_LIGHT_BLACK }}>
                        {selectedOption === option && <View style={styles.innerCircle} />}
                    </View>
                    <Text
                        className="font-medium text-base flex-1"
                        style={styles.radioButtonText}>{option?.name} - RS. {option.price}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    radioButton: {
        flexDirection: 'row',
        marginVertical: 8,
        alignItems: "center"
    },
    radioButtonCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: "center",
        justifyContent: 'center',
    },
    innerCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: THEME_COLORS.PRIMARY_COLOR,
    },
    radioButtonText: {
        marginLeft: 8,

        fontFamily: "Poppins-Regular"
    },
});

export default RadioButton;
