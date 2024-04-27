import * as React from "react"
import Svg, { Path } from "react-native-svg"

function UserCircleIcon(props) {
    return (
        <Svg
            width={44}
            height={44}
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M22 0C10.003 0 .283 9.72.283 21.717c0 11.996 9.72 21.716 21.717 21.716 11.997 0 21.717-9.72 21.717-21.716C43.717 9.72 33.997 0 22 0zm0 8.406a7.706 7.706 0 110 15.412 7.706 7.706 0 010-15.412zm0 30.123c-5.14 0-9.746-2.329-12.829-5.972 1.647-3.1 4.87-5.236 8.626-5.236.21 0 .42.035.622.096 1.138.368 2.329.604 3.581.604 1.252 0 2.452-.236 3.581-.604.202-.061.412-.096.622-.096 3.757 0 6.98 2.136 8.626 5.236C31.746 36.2 27.14 38.53 22 38.53z"
                fill="#fff"
            />
        </Svg>
    )
}

export default UserCircleIcon;
