import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { THEME_COLORS } from "../app/constants/colors"

function RegisterEventIcon(props) {
    return (
        <Svg
            width={55}
            height={55}
            viewBox="0 0 55 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M27.056 43H14.778A3.778 3.778 0 0111 39.222V16.556a3.777 3.777 0 013.778-3.778h22.666a3.777 3.777 0 013.778 3.778V26M33.667 9v7.556M18.556 9v7.556M11 24.11h30.222m-7.555 15.111H45m-5.667-5.666v11.333"
                stroke={THEME_COLORS.PRIMARY_COLOR}
                strokeWidth={3.77778}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default RegisterEventIcon
