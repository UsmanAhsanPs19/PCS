import * as React from "react"
import Svg, { Path, G, Defs, ClipPath } from "react-native-svg"

function DiamondMedalIcon(props) {
    return (
        <Svg
            width={40}
            height={40}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M17.993 1.164a4 4 0 014.014 0l6.643 3.854 6.659 3.826a4 4 0 012.007 3.476L37.3 20l.016 7.68a4 4 0 01-2.007 3.476l-6.659 3.826-6.643 3.854a4 4 0 01-4.014 0l-6.643-3.854-6.659-3.826a4 4 0 01-2.007-3.476L2.7 20l-.016-7.68a4 4 0 012.007-3.476l6.659-3.826 6.643-3.854z"
                fill="#FFD54B"
            />
            <G clipPath="url(#clip0_389_5859)">
                <Path
                    d="M20 15l3.333 5 4.167-3.333L25.833 25H14.167L12.5 16.667 16.667 20 20 15z"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_389_5859">
                    <Path fill="#fff" transform="translate(10 10)" d="M0 0H20V20H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default DiamondMedalIcon
