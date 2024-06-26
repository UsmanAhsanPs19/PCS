import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { THEME_COLORS } from "../app/constants/colors";

function MedicalFileIcon(props) {
    return (
        <Svg
            width={props.width || 36}
            height={props.height || 36}
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M27.227 27.016a1.463 1.463 0 00-1.463 1.463 1.463 1.463 0 01-1.463 1.463H9.67a1.463 1.463 0 01-1.463-1.463V7.996A1.463 1.463 0 019.67 6.532h7.315v4.39a4.39 4.39 0 004.39 4.39h4.389v1.462a1.463 1.463 0 102.926 0v-2.926-.088a1.908 1.908 0 00-.088-.395.469.469 0 000-.132 1.565 1.565 0 00-.278-.41l-8.778-8.778a1.564 1.564 0 00-.41-.278h-.146a1.668 1.668 0 00-.44-.16H9.67a4.39 4.39 0 00-4.39 4.389v20.483a4.39 4.39 0 004.39 4.39H24.3a4.39 4.39 0 004.39-4.39 1.463 1.463 0 00-1.463-1.463zm-7.316-18.42l3.79 3.789h-2.326a1.463 1.463 0 01-1.463-1.463V8.595zm10.242 12.568h-3.657a1.464 1.464 0 00-1.04.424l-1.814 1.829-4.096-4.682a1.463 1.463 0 00-2.136-.073l-2.488 2.502h-2.326a1.463 1.463 0 000 2.926h2.926a1.461 1.461 0 001.039-.424l1.887-1.83 4.097 4.683a1.462 1.462 0 001.054.497 1.464 1.464 0 001.038-.424l2.458-2.502h3.058a1.463 1.463 0 000-2.926z"
                fill={THEME_COLORS.PRIMARY_COLOR}
            />
        </Svg>
    )
}

export default MedicalFileIcon;
