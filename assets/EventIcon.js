import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EventIcon(props) {
    return (
        <Svg
            width={54}
            height={36}
            viewBox="0 0 54 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M11.889 8.917H41.61V26.75H11.89V8.917zm37.153 8.916a4.458 4.458 0 004.458 4.459v8.916a4.458 4.458 0 01-4.458 4.459H4.458A4.458 4.458 0 010 31.208v-8.916a4.458 4.458 0 000-8.917V4.458A4.458 4.458 0 014.458 0h44.584A4.458 4.458 0 0153.5 4.458v8.917a4.458 4.458 0 00-4.458 4.458zm-4.459-9.66a2.23 2.23 0 00-2.229-2.229H11.146a2.23 2.23 0 00-2.23 2.23v19.32a2.23 2.23 0 002.23 2.228h31.208a2.23 2.23 0 002.23-2.229V8.173z"
                fill="#fff"
            />
        </Svg>
    )
}

export default EventIcon
