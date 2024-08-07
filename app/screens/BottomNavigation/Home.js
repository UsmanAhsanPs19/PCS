import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { UserCircleIcon } from "react-native-heroicons/solid";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import {
  get_profile,
  top_speakers_url,
  top_sponsers_url,
} from "../../constants/APIEndpoints";
import { THEME_COLORS } from "../../constants/colors";
import { navigation_data_after_auth, navigation_section_data, pcs_portal_data } from "../../constants/data";
import { GlbalLocale } from "../../constants/locale";
import { MEDIA_BASE_URL, getRequest } from "../../helpers/APIRequest";
import HomeHeader from "./components/header";
import { setAuth } from "../../redux/AuthSlice";
import { useIsFocused } from "@react-navigation/native";
export default function HomeScreen({ navigation }) {
  const { isAuthorized } = useSelector((state) => state?.AuthStore);
  const { user } = useSelector(state => state.AuthStore);
  const { general_info } = useSelector((state) => state?.GeneralState);
  const [speakers_loading, setSpeakersLoading] = useState(false);
  const [sponsers_loading, setSponsersLoading] = useState(false);
  const [top_speakers, setTopSpeakers] = useState([]);
  const [top_sponsers, setTopSponsers] = useState([]);
  const dispatch = useDispatch()
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getSpeakers();
      getSponsers();
      if (isAuthorized)
        getUserData();
    }
  }, [isFocused, isAuthorized]);

  // Get list of top speakers
  async function getSpeakers() {
    setSpeakersLoading(true);
    await getRequest(top_speakers_url)
      .then((response) => {
        console.log("getSpeakers Data::", response);
        if (response.status && response.data) {
          setTopSpeakers(response.data);
        }
        setSpeakersLoading(false);
      })
      .catch((error) => {
        console.log("getSpeakers Error:::", error);
        setSpeakersLoading(false);
      });
  }

  // Get user data
  async function getUserData() {
    await getRequest(get_profile).then(response => {
      console.log("Data:::", response)
      if (response.status) {
        dispatch(setAuth(response.data?.profile));
      }
    }).catch(error => {
      console.log("Error GEt Profile::", error)
    })
  }

  // Get list of top sponsers
  async function getSponsers() {
    setSponsersLoading(true);
    await getRequest(top_sponsers_url)
      .then((response) => {
        console.log("getSponsers Data::", response);
        if (response.status && response.data) {
          setTopSponsers(response.data);
        }
        setSponsersLoading(false);
      })
      .catch((error) => {
        console.log("getSponsers Error:::", error);
        setSponsersLoading(false);
      });
  }

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: THEME_COLORS.BG_DASHBOARD }}
    >
      <StatusBar style="light" />
      <HomeHeader />
      <ScrollView>
        {/* Content of page section */}
        <View className="space-y-3">
          {/* Container sections that have pending */}
          <View className="px-3 space-y-3">
            {/* Held date section */}
            <View className="">
              <Text
                className="text-base mt-1 text-center"
                style={{
                  color: THEME_COLORS.GRAY_TEXT,
                  fontFamily: "Poppins-Medium",
                }}
              >
                {general_info?.date}
              </Text>
              <Text
                className="text-xs text-center"
                style={{
                  color: THEME_COLORS.GRAY_TEXT,
                  fontFamily: "Poppins-Regular",
                }}
              >
                {general_info?.location}
              </Text>
            </View>

            {/* PC portal all components */}
            <View>
              {/* PCS Portal section */}
              <View className="my-2 flex-row justify-between items-center">
                <Text
                  className={"text-xl font-medium"}
                  style={{
                    color: THEME_COLORS.textColor,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  {GlbalLocale.pcs_portal}
                </Text>
                {isAuthorized && <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("PCSPortal");
                  }}
                >
                  <Text
                    className={""}
                    style={{
                      fontSize: hp(1.5),
                      color: THEME_COLORS.PRIMARY_DARK,
                      fontFamily: "Poppins-SemiBold",
                    }}
                  >
                    See all
                  </Text>
                </TouchableOpacity>}
              </View>
              {/* Portal section after login */}
              {isAuthorized && (
                <View className="mx-1 space-y-2">
                  {/* Row 1 */}
                  <View className=" flex-row items-center justify-center space-x-3">
                    {pcs_portal_data.firstData.map((d) => (
                      <TouchableOpacity
                        onPress={() => {
                          if (d.screenName) {
                            navigation.navigate(d.screenName);
                          }
                          else if (d.key !== "modify_profile") {
                            navigation.navigate({ name: 'WebSubmissionForms', params: { title: d.text, path: `${user && user[d.key] ? "edit-" : ""}${d.link}${user.user_id}` } })
                          }
                        }}
                        style={{
                          elevation: 3,
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 3 },
                          shadowOpacity: 0.3,
                          shadowRadius: 3,
                          height: hp("10%"),
                        }}
                        className=" w-1/3 flex-1 p-3 bg-white items-center justify-center rounded-xl"
                      >
                        {d?.icon}
                        <Text
                          className="text-center mt-1"
                          style={{
                            color: THEME_COLORS.textColor,
                            fontFamily: "Poppins-Medium",
                            fontSize: hp(1),
                          }}
                        >
                          {d?.text}
                        </Text>
                        {d?.key && user && user[d.key] == 1 && (
                          <Text
                            className="py-0.5 px-2 rounded-full text-center"
                            style={{
                              color: "white",
                              fontFamily: "Poppins-Medium",
                              fontSize: hp(0.8),
                              backgroundColor: THEME_COLORS.PRIMARY_COLOR,
                            }}
                          >
                            Edit Submission
                          </Text>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                  {/* Row 2 */}
                  <View className="w-full flex-row items-center justify-center space-x-3">
                    {pcs_portal_data.secondData.map((d) => (
                      <TouchableOpacity
                        disabled={!d.link}
                        onPress={() => {
                          if (d.key !== "modify_profile" && d.link) {
                            navigation.navigate({ name: 'WebSubmissionForms', params: { title: d.text, path: `${d.link}${user.user_id}` } })
                          }

                        }}
                        style={{
                          elevation: 3,
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 3 },
                          shadowOpacity: 0.3,
                          shadowRadius: 3,
                          height: hp("10%"),
                        }}
                        className="w-1/3 flex-1 p-3 bg-white items-center justify-center rounded-xl"
                      >
                        {d.icon}
                        <Text
                          className="text-center mt-1"
                          style={{
                            color: THEME_COLORS.textColor,
                            fontFamily: "Poppins-Medium",
                            fontSize: hp(1),
                          }}
                        >
                          {d.text}
                        </Text>
                        {d.key && user && user[d.key] == 1 && (
                          <Text
                            className="py-0.5 px-2 rounded-full text-center"
                            style={{
                              color: "white",
                              fontFamily: "Poppins-Medium",
                              fontSize: hp(0.8),
                              backgroundColor: THEME_COLORS.PRIMARY_COLOR,
                            }}
                          >
                            Edit Submission
                          </Text>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {/* Portal section without login */}
              {!isAuthorized && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                  className="space-y-2 rounded-xl p-4 items-center justify-center"
                  style={{
                    height: hp("20%"),
                    backgroundColor: THEME_COLORS.PRIMARY_COLOR_DARK,
                  }}
                >
                  <UserCircleIcon color={"white"} size={hp(10)} />
                  <Text
                    className={"text-sm font-normal text-center"}
                    style={{ color: "white", fontFamily: "Poppins-Regular" }}
                  >
                    {GlbalLocale.login_dashboard_text}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Navigation section */}
            <View>
              {/* Navigation header */}
              <View className="my-2 flex-row justify-between items-center">
                <Text
                  className={"text-xl font-medium"}
                  style={{
                    color: THEME_COLORS.textColor,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  {GlbalLocale.navigation_label}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("NavigationPortal");
                  }}
                >
                  <Text
                    className={""}
                    style={{
                      fontSize: hp(1.5),
                      color: THEME_COLORS.PRIMARY_DARK,
                      fontFamily: "Poppins-SemiBold",
                    }}
                  >
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
              {/* Navigation Container Content */}
              <View className="">
                <FlatList
                  disableVirtualization
                  data={!isAuthorized ? navigation_section_data : navigation_section_data.slice(0, navigation_section_data.length - 1).concat(navigation_data_after_auth)}
                  numColumns={2}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      key={`navigation-${index}`}
                      onPress={() => {
                        if (item.screenName) {
                          navigation.navigate(item.screenName);
                        }
                      }}
                      style={{
                        height: hp("12%"),
                        backgroundColor: THEME_COLORS.PRIMARY_COLOR_DARK,
                      }}
                      className={`flex-1 ${(index + 1) / 2 == 0 ? "ml-2" : "mr-2"
                        } mb-2 p-3 bg-white items-center justify-center rounded-xl`}
                    >
                      {item.icon}
                      <Text
                        className="text-center mt-1"
                        style={{
                          color: "white",
                          fontFamily: "Poppins-Medium",
                        }}
                      >
                        {item.text}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>

            {/* Speakers section */}
            <View>
              {/* Speakers header */}
              <View className="my-2 flex-row justify-between items-center">
                <Text
                  className={"text-xl font-medium"}
                  style={{
                    color: THEME_COLORS.textColor,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  {GlbalLocale.speakers_label}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("SpeakersScreen");
                  }}
                >
                  <Text
                    className={""}
                    style={{
                      fontSize: hp(1.5),
                      color: THEME_COLORS.PRIMARY_DARK,
                      fontFamily: "Poppins-SemiBold",
                    }}
                  >
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
              {/* Speakers Container Content */}
              <View className="space-y-1">
                <FlatList
                  disableVirtualization
                  data={top_speakers}
                  ListEmptyComponent={
                    speakers_loading ? (
                      <View className="bg-white space-y-1 my-2 flex justify-center items-center">
                        <ActivityIndicator
                          color={THEME_COLORS.PRIMARY_DARK}
                          size={"large"}
                        />
                        <Text
                          style={{
                            color: THEME_COLORS.GRAY_TEXT,
                            fontFamily: "Poppins-Regular",
                          }}
                        >
                          Please wait...
                        </Text>
                      </View>) : (
                      <Text
                        className="text-center"
                        style={{
                          color: THEME_COLORS.GRAY_TEXT,
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        There is no speakers
                      </Text>
                    )
                  }
                  numColumns={2}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      key={`speakers-${index}`}
                      style={{
                        height: hp("10%"),
                        elevation: 3,
                        backgroundColor: THEME_COLORS.PRIMARY_COLOR_DARK,
                      }}
                      className={`flex-1 ${(index + 1) / 2 == 0 ? "ml-2" : "mr-2"
                        } mb-2 flex-row bg-white items-center justify-center rounded-xl`}
                    >
                      <Image
                        className="rounded-lg"
                        resizeMode="cover"
                        style={{ height: "100%", width: wp("15%") }}
                        source={{ uri: `${MEDIA_BASE_URL}/${item.image}` }}
                      />
                      <View className="px-1 flex-1">
                        <Text
                          className="text-center text-sm"
                          numberOfLines={2}
                          style={{
                            color: "white",
                            // fontSize: hp(1.3),
                            fontFamily: "Poppins-SemiBold",
                          }}
                        >{`${item.name}(${item.country})`}</Text>
                        <Text
                          className="text-center"
                          numberOfLines={2}
                          style={{
                            color: "white",
                            fontFamily: "Poppins-Regular",
                            fontSize: hp(1),
                          }}
                        >
                          {item.tagline}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </View>

          {/* Sponsers section */}
          <View className="mb-5">
            {/* Sponsers header */}
            <View className="px-3 my-2 flex-row justify-between items-center">
              <Text
                className={"text-xl font-medium"}
                style={{
                  color: THEME_COLORS.textColor,
                  fontFamily: "Poppins-Medium",
                }}
              >
                {GlbalLocale.sponsers_label}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SponsersScreens");
                }}
              >
                <Text
                  className={""}
                  style={{
                    fontSize: hp(1.5),
                    color: THEME_COLORS.PRIMARY_DARK,
                    fontFamily: "Poppins-SemiBold",
                  }}
                >
                  See all
                </Text>
              </TouchableOpacity>
            </View>

            {/* Sponsers content */}
            <View className="bg-white flex-wrap w-full p-3 space-x-7 space-y-3 justify-stretch items-center flex-row">
              {sponsers_loading ? (
                <View className="space-y-1 flex-1 my-2 flex justify-center items-center">
                  <ActivityIndicator
                    color={THEME_COLORS.PRIMARY_DARK}
                    size={"large"}
                  />
                  <Text
                    style={{
                      color: THEME_COLORS.GRAY_TEXT,
                      fontFamily: "Poppins-Regular",
                    }}
                  >
                    Please wait...
                  </Text>
                </View>
              ) :
                top_sponsers.length > 0 ? (
                  top_sponsers.map((image, index) => (
                    <View key={`sponsers-${index}`} className="p-3">
                      <Image
                        key={index}
                        resizeMode="contain"
                        className=""
                        style={{ height: hp(6), width: wp("17%") }}
                        source={{ uri: `${MEDIA_BASE_URL}/${image.image}` }}
                      />
                    </View>
                  ))
                ) : (
                  <Text
                    className="flex-1 self-center text-center"
                    style={{
                      color: THEME_COLORS.GRAY_TEXT,
                      fontFamily: "Poppins-Regular",
                    }}
                  >
                    There is no sponsers
                  </Text>
                )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
