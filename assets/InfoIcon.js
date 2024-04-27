import * as React from "react"
import Svg, { Path } from "react-native-svg"

function InfoIcon(props) {
    return (
        <Svg
            width={34}
            height={34}
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M32 17c0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15C2 8.716 8.716 2 17 2c8.284 0 15 6.716 15 15zM17 23V11"
                stroke="#fff"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default InfoIcon;
