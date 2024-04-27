import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ScheduleIcon(props) {
    return (
        <Svg
            width={43}
            height={44}
            viewBox="0 0 43 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M14.625 16.5h5.5V22h-5.5v-5.5zm8.25 0h5.5V22h-5.5v-5.5zm8.25 0h5.5V22h-5.5v-5.5zM6.375 33h5.5v5.5h-5.5V33zm8.25 0h5.5v5.5h-5.5V33zm8.25 0h5.5v5.5h-5.5V33zm-8.25-8.25h5.5v5.5h-5.5v-5.5zm8.25 0h5.5v5.5h-5.5v-5.5zm8.25 0h5.5v5.5h-5.5v-5.5zm-24.75 0h5.5v5.5h-5.5v-5.5zM36.625 0v2.75h-5.5V0h-19.25v2.75h-5.5V0h-5.5v44h41.25V0h-5.5zm2.75 41.25H3.625V11h35.75v30.25z"
                fill="#fff"
            />
        </Svg>
    )
}

export default ScheduleIcon;
