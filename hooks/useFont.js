import * as Font from "expo-font";

export default useFonts = async () =>
    await Font.loadAsync({
        'Poppins-Black': require('../assets/fonts/poppins_black.ttf'),
        'Poppins-Bold': require('../assets/fonts/poppins_bold.ttf'),
        'Poppins-ExtraBold': require('../assets/fonts/poppins_extrabold.ttf'),
        'Poppins-Light': require('../assets/fonts/poppins_light.ttf'),
        'Poppins-Medium': require('../assets/fonts/poppins_medium.ttf'),
        'Poppins-Regular': require('../assets/fonts/poppins_regular.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/poppins_semiBold.ttf'),
        'Poppins-Thin': require('../assets/fonts/poppins_thin.ttf'),
    });