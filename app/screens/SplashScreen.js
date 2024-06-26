import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppIcon from "../../assets/AppIcon";
import { get_profile } from "../constants/APIEndpoints";
import { THEME_COLORS } from "../constants/colors";
import { getRequest } from "../helpers/APIRequest";
import { setAuth, setIsAuthorized } from "../redux/AuthSlice";

export default function SplashScreen() {
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector((state) => state?.AuthStore);
  const navigation = useNavigation();

  useEffect(() => {
    getTokenOrProceed();
  }, [isAuthorized]);

  // useEffect(() => {
  //     if (!isAuthorized) {
  //         navigation.reset({
  //             index: 0,
  //             routes: [{ name: 'Dashboard' }],
  //         });
  //     }
  // }, [isAuthorized])

  async function getTokenOrProceed() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      getUserData(token);
    } else
      setTimeout(() => {
        // toggleColorScheme()
        navigation.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        });
      }, 2500);
  }

  async function getUserData(token) {
    await getRequest(get_profile, token)
      .then((respponse) => {
        if (respponse.status) {
          dispatch(setAuth(respponse.data?.profile));
          dispatch(setIsAuthorized(true));
          navigation.replace("Dashboard");
        } else {
          setTimeout(() => {
            // toggleColorScheme()
            navigation.replace("Login");
          }, 2500);
        }
      })
      .catch((error) => {
        console.log("Error GEt Profile::", error);
      });
  }
  return (
    <View
      style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
      className="flex-1 items-center justify-center py-20 flex-col"
    >
      <StatusBar style={"light"} />
      {/* app logo image */}
      <View>
        <AppIcon />
        <ActivityIndicator
          size={"large"}
          color={THEME_COLORS.PRIMARY_COLOR}
          className="my-5"
        />
      </View>
    </View>
  );
}
