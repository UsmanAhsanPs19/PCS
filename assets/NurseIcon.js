import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { THEME_COLORS } from "../app/constants/colors";

function NurseIcon(props) {
    return (
        <Svg
            width={props.width || 37}
            height={props.height || 36}
            viewBox="0 0 37 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M16.146 8.35c0-.555.45-1.005 1.005-1.005h.29v-.29a1.005 1.005 0 112.01 0v.29h.293a1.005 1.005 0 110 2.01h-.292v.29a1.005 1.005 0 11-2.01 0v-.29h-.29c-.556 0-1.006-.45-1.006-1.005zm8.268 23.276c-1.091.002-2.767-.47-3.732-2.156-2.373.89-4.488.035-4.488.035-.968 1.655-2.63 2.092-3.723 2.12-1.832.049-3.068-1.168-3.068-1.168-1.398-1.232-1.272-3.601-1.272-3.601v-9.462a10.35 10.35 0 013.009-7.267l-.822-2.305a1.003 1.003 0 01.33-1.13c3.945-3.066 7.8-2.755 7.8-2.755 4.48.103 7.685 2.775 7.685 2.775.344.286.458.765.278 1.175l-.878 2.01a10.355 10.355 0 013.232 7.497v9.462c.03.374-.095 2.165-.945 3.244-1.232 1.564-3.406 1.526-3.406 1.526zm-1.813-20.04l1.642-3.758c-3.014-1.971-5.795-1.89-5.795-1.89-3.36-.11-5.985 1.912-5.985 1.912l1.314 3.69s2.347-.977 4.67-.833c0 0 2.12.026 4.154.879zm-2.403 5.94c-2.145 2.766-6.783 2.481-6.783 2.481l.016 2.915c0 2.723 2.229 4.933 4.968 4.933a4.932 4.932 0 004.927-4.927l-.017-3.062c-2.132-.505-3.111-2.34-3.111-2.34zm6.557 9.376v-9.508a8.339 8.339 0 00-2.092-5.51l-.629 1.44c-.46.918-1.373.496-1.373.496-2.35-1.21-4.245-1.099-4.245-1.099-2.92-.063-4.695 1.062-4.695 1.062-1.099.48-1.465-.524-1.465-.524l-.347-.973a8.337 8.337 0 00-1.768 5.108v9.508s-.157 2.621 2.138 2.702c.165.006 1.381.09 2.111-1.007-1.793-1.257-2.97-3.327-2.97-5.669l-.016-3.033c-.552-.06-.977-.558-.918-1.11a1 1 0 011.108-.89c3.147.345 5.455-.087 6.685-1.241 1.01-.948.986-2.101.983-2.18 0 0 .002-1 .947-1.063.955-.063 1.06.96 1.06.96.001.014.115 1.914 1.344 2.963.675.576 1.61.806 2.772.682a1.005 1.005 0 11.212 1.999c-.095.01-.184.009-.277.016l.016 2.891a6.93 6.93 0 01-2.875 5.616c.75 1.211 2.073 1.078 2.138 1.068 2.266-.313 2.156-2.704 2.156-2.704z"
                fill={THEME_COLORS.PRIMARY_COLOR}
            />
        </Svg>
    )
}

export default NurseIcon;