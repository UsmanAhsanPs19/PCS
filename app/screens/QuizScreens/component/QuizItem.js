import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { THEME_COLORS } from '../../../constants/colors'
import moment from 'moment';

export default function QuizItem({ item, onPress, showDetails = false, isForPool = false }) {
    const { title, start_time, session_date } = item?.schedule_details || {};
    function getTimePassedOrNot() {
        let isPassed = false;
        const startTime = start_time;
        const sessionDate = session_date?.date;

        const arePresentAndUpcoming = !(startTime === null || startTime === undefined || sessionDate === null || sessionDate === undefined);
        if (arePresentAndUpcoming) {
            const formattedSessionDate = moment(sessionDate).format('YYYY-MM-DD'); // Format date for comparison
            const formattedStartTime = moment(startTime, 'h:mm A').format('HH:mm'); // Format time for comparison (24-hour format)

            const sessionDateTime = moment(`${formattedSessionDate} ${formattedStartTime}`);
            const now = moment();

            if (sessionDateTime.isAfter(now)) {
                isPassed = false
                // console.log("start_time and session_date.date are present and upcoming.");
            } else {
                isPassed = true;
                // console.log("The session has already started or is in the past.");
            }
        }
        else {
            isPassed = false
            console.log("One or both properties are missing.");
        }

        return isPassed;
    }

    return (
        <View className="bg-white border-2 border-red-500 rounded p-2 mb-3"
            style={{
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 35,
                shadowColor: THEME_COLORS.BUTTON_SHADOW,
                shadowOpacity: 0.05,
                elevation: 2,
            }}
        >
            <Text style={{ color: THEME_COLORS.PRIMARY_COLOR, fontFamily: "Poppins-SemiBold" }}>{title}</Text>
            <View className="flex-row my-1 items-center justify-between text-sm">
                <Text style={{ color: THEME_COLORS.PLACEHOLDER_COLOR, fontFamily: "Poppins-Regular" }}>{showDetails && !isForPool && "By: " + (item?.quiz_speaker?.name || "") + "\n"}{(isForPool ? item?.poll_questions?.length : item?.quiz_questions?.length) + " Questions" || 0}</Text>
                {showDetails && <TouchableOpacity
                    onPress={onPress}
                    disabled={isForPool ? !item.status : !getTimePassedOrNot()}
                    className="px-4 py-2 items-center justify-center self-center rounded-full"
                    style={{
                        backgroundColor: THEME_COLORS.PRIMARY_COLOR
                    }}
                >
                    <Text className="text-white text-sm"
                        style={{
                            fontFamily: "Poppins-Regular"
                        }}
                    >{isForPool ? item.status ? "Start Poll" : "No Pool Available" : getTimePassedOrNot() ? "Start Quiz" : "Quiz Not Started"}</Text>
                </TouchableOpacity>}
            </View>
            {!isForPool && !getTimePassedOrNot() && showDetails && <Text
                className="text-xs mt-1"
                style={{
                    color: THEME_COLORS.PLACEHOLDER_COLOR,
                    fontFamily: "Poppins-Regular"
                }}
            >{"Note: Quiz will start in the last 30 minutes of the session"}</Text>}
        </View>
    )
}