import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SplashScreen from '../screens/SplashScreen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import HomeScreen from '../screens/HomeScreen';
// import RecipeDetails from '../screens/RecipeDetails';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import VerificationScreen from '../screens/Auth/VerificationScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';
import NavigationScreen from '../screens/BottomNavigation/Navigation';
import HomeScreen from '../screens/BottomNavigation/Home';
import { THEME_COLORS } from '../constants/colors';
import { CalendarDaysIcon, HomeIcon, Squares2X2Icon } from 'react-native-heroicons/outline';
import PCSPortal from '../screens/OtherScreens/PCSPortal';
import NavigationPortal from '../screens/OtherScreens/NavigationPortal';
import GeneralInformation from '../screens/OtherScreens/GeneralInformation';
import SpeakersScreen from '../screens/OtherScreens/SpeakersScreen';
import SpeakerDetails from '../screens/OtherScreens/SpeakerDetails';
import SessionDetails from '../screens/OtherScreens/SessionDetails';
import ScheduleScreen from '../screens/OtherScreens/ScheduleScreen';
import SponsersScreens from '../screens/OtherScreens/SponsersScreens';
import GeneralInformationScreen from '../screens/OtherScreens/GeneralInformationScreen';
import ChangeForgotPassword from '../screens/Auth/ChangeForgotPassword';
import ModifyAccount from '../screens/OtherScreens/ModifyAccount';
import RegisterForConference from '../screens/OtherScreens/RegisterForConference';
import BookSouvinir from '../screens/OtherScreens/Souvinir/BookSouvinir';
import RegistrantsList from '../screens/OtherScreens/RegistrantsList';
import RegistrantDetails from '../screens/OtherScreens/RegistrantDetails';
import WebSubmissionForms from '../screens/OtherScreens/WebSubmissionForms';

// Create a bottom tab navigator
const BottomTabs = createBottomTabNavigator();
//Other screens
const MainScreens = createNativeStackNavigator();
export default function AppNavigation() {

    function Dashboard() {
        return (
            <BottomTabs.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Home') {
                        return <HomeIcon size={size} color={color} />
                    }
                    // else if (route.name === 'Navigation') {
                    //     return <Squares2X2Icon size={size} color={color} />
                    // }
                    // else if (route.name === 'Schedule') {
                    //     return <CalendarDaysIcon size={size} color={color} />
                    // }

                    // You can return any component that you like here!
                    // return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarStyle: {
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderWidth: 1,
                    borderColor: THEME_COLORS.BORDER_COLOR,
                    height: hp('7%')
                },
                tabBarLabelStyle: {
                    fontFamily: "Poppins-Regular"
                },
                headerShown: false
            })}
                tabBarOptions={{
                    activeTintColor: THEME_COLORS.PRIMARY_COLOR,
                    inactiveTintColor: 'gray',
                }}
            >
                <BottomTabs.Screen name="Home" component={HomeScreen} />
                {/* <BottomTabs.Screen name="Navigation" component={NavigationScreen} />
                <BottomTabs.Screen name="Schedule" component={ScheduleScreen} /> */}
            </BottomTabs.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <MainScreens.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
                {/* <MainScreens.Navigator initialRouteName='GeneralInformation' screenOptions={{ headerShown: false }}> */}
                <MainScreens.Screen name='Splash' component={SplashScreen} />
                <MainScreens.Screen name='Login' component={LoginScreen} />
                <MainScreens.Screen name='Signup' component={SignupScreen} />
                <MainScreens.Screen name='Verification' component={VerificationScreen} />
                <MainScreens.Screen name='Forgot' component={ResetPasswordScreen} />
                <MainScreens.Screen name='ChangePassword' component={ChangeForgotPassword} />
                <MainScreens.Screen name='UpdateProfile' component={ModifyAccount} />
                <MainScreens.Screen name='Dashboard' component={Dashboard} />
                <MainScreens.Screen name='PCSPortal' component={PCSPortal} />
                <MainScreens.Screen name='NavigationPortal' component={NavigationPortal} />
                <MainScreens.Screen name='EventInfo' component={GeneralInformation} />
                <MainScreens.Screen name='SpeakersScreen' component={SpeakersScreen} />
                <MainScreens.Screen name='SpeakerDetails' component={SpeakerDetails} />
                <MainScreens.Screen name='SessionDetails' component={SessionDetails} />
                <MainScreens.Screen name='ScheduleScreen' component={ScheduleScreen} />
                <MainScreens.Screen name='SponsersScreens' component={SponsersScreens} />
                <MainScreens.Screen name='GeneralInformation' component={GeneralInformationScreen} />
                <MainScreens.Screen name='RegisterForConference' component={RegisterForConference} />
                <MainScreens.Screen name='GetSouvinir' component={BookSouvinir} />
                <MainScreens.Screen name='RegistrantsList' component={RegistrantsList} />
                <MainScreens.Screen name='RegistrantsDetails' component={RegistrantDetails} />
                <MainScreens.Screen name='WebSubmissionForms' component={WebSubmissionForms} />

                {/*<MainScreens.Screen name='RecipeDetail' component={RecipeDetails} /> */}
            </MainScreens.Navigator>
        </NavigationContainer>
    )
}