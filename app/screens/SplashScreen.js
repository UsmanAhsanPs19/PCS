import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppIcon from "../../assets/AppIcon";
import { general_information, get_profile } from "../constants/APIEndpoints";
import { THEME_COLORS } from "../constants/colors";
import { getRequest } from "../helpers/APIRequest";
import { setAuth, setIsAuthorized } from "../redux/AuthSlice";
import Toast from "react-native-toast-message";
import { setGeneralInfo } from "../redux/GeneralInfoSlice";

export default function SplashScreen() {
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector((state) => state?.AuthStore);
  const navigation = useNavigation();


  useEffect(() => {
    getTokenOrProceed();
    getGeneralInformation()
  }, [isAuthorized]);

  function getGeneralInformation() {
    getRequest(general_information)
      .then((respponse) => {
        if (respponse.status) {
          console.log("General api data:::", respponse.data)
          dispatch(setGeneralInfo(respponse.data));
        } else {
          Toast.show({
            text1: "Error getting information",
            type: "error",
            text2: respponse.message || "Error while getting general information please try again later."
          })
        }
      })
      .catch((error) => {
        Toast.show({
          text1: "Error getting information",
          type: "error",
          text2: "Error while getting general information please try again later."
        })
        console.log("Error GEt general profile::", error);
      });
  }

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
          console.log("User data:::", respponse.data)
          dispatch(setAuth({ ...respponse.data?.profile, status: respponse.status }));
          dispatch(setIsAuthorized(true));
          // EntryAppDashboard
          if (respponse.status > 1) {
            navigation.replace("EntryAppDashboard");
          }
          else
            navigation.replace("Dashboard");
        } else {
          // setTimeout(() => {
          //   // toggleColorScheme()
          navigation.replace("Login");
          // }, 2500);
        }
      })
      .catch((error) => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        });
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
