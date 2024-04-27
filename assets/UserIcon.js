import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { THEME_COLORS } from "../app/constants/colors";

function UserIcon(props) {
    return (
        <Svg
            width={props.width || 36}
            height={props.height || 37}
            viewBox="0 0 36 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G
                clipPath="url(#clip0_32_303)"
                stroke={THEME_COLORS.PRIMARY_COLOR}
                strokeWidth={3.33075}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Path d="M17.879 23.178a8.882 8.882 0 100-17.764 8.882 8.882 0 000 17.764zM4.416 30.949a15.549 15.549 0 0126.927 0" />
            </G>
            <Defs>
                <ClipPath id="clip0_32_303">
                    <Path
                        fill="#fff"
                        transform="translate(.115 .973)"
                        d="M0 0H35.528V35.528H0z"
                    />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default UserIcon;
