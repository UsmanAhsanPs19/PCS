import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { THEME_COLORS } from '../../../constants/colors';

const QuizOption = ({ index, option, selectedAnswer, handleAnswerSelection, optionNumber }) => {
    const backgroundColor = selectedAnswer === option ? THEME_COLORS.PRIMARY_COLOR : THEME_COLORS.GRAY_300;

    return (
        <View className="mt-2 space-y-4 flex-row space-x-3">
            <TouchableOpacity
                onPress={() => {
                    let select_option = "";
                    if (index === 0) {
                        select_option = "option_one"
                    }
                    else if (index === 1) {
                        select_option = "option_two"
                    }
                    else if (index === 2) {
                        select_option = "option_three"
                    }
                    else if (index === 3) {
                        select_option = "option_four"
                    }
                    handleAnswerSelection(select_option)
                }}
                style={{ backgroundColor, borderRadius: 50, padding: 2 }}
                className="bg-gray-300 items-center justify-center w-11 h-11 rounded-full self-center flex">
                <Text style={{ fontFamily: "Poppins-Regular", color: "white" }}>{optionNumber}</Text>
            </TouchableOpacity>
            <Text style={{ color: selectedAnswer === option ? THEME_COLORS.PRIMARY_COLOR : THEME_COLORS.textColor, fontFamily: "Poppins-Regular" }}>{option}</Text>
        </View>
    );
};

const QuizQuestion = ({ quiz, selectedIndex, handleAnswerSelection = () => { } }) => {
    const selectedQuiz = quiz[selectedIndex];
    const options = [selectedQuiz?.option_one, selectedQuiz?.option_two, selectedQuiz?.option_three, selectedQuiz?.option_four];


    return (
        <View className="mt-4">
            <Text style={{ color: THEME_COLORS.textColor, fontFamily: "Poppins-Regular" }}>{selectedQuiz?.question}</Text>
            <View className="mt-4 space-y-3">
                {options.map((option, index) => (
                    <QuizOption index={index} key={index} option={option} selectedAnswer={selectedQuiz[selectedQuiz?.selectedAnswer]} handleAnswerSelection={handleAnswerSelection} optionNumber={index + 1} />
                ))}
            </View>
        </View>
    );
};

export default QuizQuestion;