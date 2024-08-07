import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MarkExitIcon(props) {
    return (
        <Svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M18.056 36H5.778A3.778 3.778 0 012 32.222V9.556a3.778 3.778 0 013.778-3.778h22.666a3.778 3.778 0 013.778 3.778V19M24.667 2v7.556M9.556 2v7.556M2 17.11h30.222m-7.555 15.111H36"
                stroke="#ED1B24"
                strokeWidth={3.77778}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default MarkExitIcon
