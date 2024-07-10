import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { THEME_COLORS } from "../../constants/colors";

import { Picker } from "@react-native-picker/picker";
import { ArrowLeftIcon, UserCircleIcon } from "react-native-heroicons/solid";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Toast from "react-native-toast-message";
import CustomInput from "../../components/CustomInput";
import { get_profession, signup_url } from "../../constants/APIEndpoints";
import { GlbalLocale } from "../../constants/locale";
import { getRequest, postRequest } from "../../helpers/APIRequest";
import CustomButton from "./components/CustomButton";
import ChooseImage from "../OtherScreens/components/ChooseImage";

export default function SignupScreen({ navigation }) {
  // const [firstName, setFirstName] = useState("Usman");
  // const [lastName, setLastName] = useState("Ahsan");
  // const [email, setEmail] = useState("wepidi4096@nolanzip.com");
  // const [profession, setProfession] = useState("Doctor");
  // const [place_of_work, setPlaceOfWork] = useState("Sahiwal");
  // const [department, setDepartment] = useState("Medical");
  // const [country, setCountry] = useState("Pakistan");
  // const [pm_number, setPmNumber] = useState("1234567890");
  // const [cnic, setCnic] = useState("3650194228051");
  // const [phone_number, setPhoneNumber] = useState("03056389636");
  // const [mobile_number, setMobileNumber] = useState("03056389636");
  // const [password, setPassword] = useState("Usman@786");
  // const [confirm_password, setConfirmPassword] = useState("Usman@786");
  // const [isLoading, setIsLoading] = useState(false);
  // const [errors, setErrors] = useState({});
  // const [selected_title, setSelectedTitle] = useState("Mr.");
  // const [selected_gender, setSelectedGender] = useState("Male");
  // const [picked_image, setPickedImage] = useState(null)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [place_of_work, setPlaceOfWork] = useState("");
  const [department, setDepartment] = useState("");
  const [country, setCountry] = useState("");
  const [pm_number, setPmNumber] = useState("");
  const [cnic, setCnic] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selected_title, setSelectedTitle] = useState("Mr.");
  const [selected_gender, setSelectedGender] = useState("Male");
  const [picked_image, setPickedImage] = useState(null)
  const [profession_list, setProfessionList] = useState([])

  useEffect(() => {
    // This effect runs whenever any of the following values change
    clearError()
  }, [
    firstName,
    lastName,
    email,
    profession,
    place_of_work,
    department,
    country,
    pm_number,
    cnic,
    phone_number,
    mobile_number,
    password,
    confirm_password,
    selected_title,
    selected_gender,
    picked_image
  ]);

  // Get profession and make a selection dropdown
  useEffect(() => {
    getProfessions()
  }, [])

  async function getProfessions() {
    await getRequest(get_profession)
      .then((response) => {
        console.log("getProfessions Data::", response);
        if (response.status && response.data) {
          setProfessionList(response.data)
        }
        else {
          Toast.show({
            text1: "Profession",
            autoHide,
            position: "top",
            type: "error",
            text2: response.message || response?.error?.message || "Some issue while getting professions."
          })
        }
      })
      .catch((error) => {
        console.log("getProfessions Error:::", error);
      });
  }

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Password length must be 6
  const validatePasswordLength = (password) => {
    return password.length >= 6;
  };

  //Check if full name contains any numbers
  const validateFullName = (fullName) => {
    const re = /\d/;
    return !re.test(fullName);
  };

  function clearError() {
    setErrors({});
  }

  const handleValidation = () => {
    let isValid = true;
    let tempError = { ...errors };

    if (firstName.trim() === "") {
      tempError = { ...tempError, firstName: "First name is required" };
      isValid = false;
    }
    if (lastName.trim() === "") {
      tempError = { ...tempError, lastName: "Last name is required" };
      isValid = false;
    }
    if (profession.trim() === "") {
      tempError = { ...tempError, profession: "Profession field is required" };
      isValid = false;
    }
    if (place_of_work.trim() === "") {
      tempError = {
        ...tempError,
        place_of_work: "Place of work field is required",
      };
      isValid = false;
    }
    if (department.trim() === "") {
      tempError = { ...tempError, department: "Department field is required" };
      isValid = false;
    }

    if (country.trim() === "") {
      tempError = { ...tempError, country: "Country is required" };
      isValid = false;
    }

    if (phone_number.trim() === "") {
      tempError = { ...tempError, phone_number: "Phone number is required" };
      isValid = false;
    }

    if (mobile_number.trim() === "") {
      tempError = { ...tempError, mobile_number: "Mobile number is required" };
      isValid = false;
    }

    if (!validateFullName(firstName)) {
      tempError = {
        ...tempError,
        firstName: "First name should not contain numbers",
      };
      isValid = false;
    }
    if (!validateFullName(lastName)) {
      tempError = {
        ...tempError,
        lastName: "Last name should not contain numbers",
      };
      isValid = false;
    }

    if (!validateFullName(profession)) {
      tempError = {
        ...tempError,
        profession: "Profession should not contain numbers",
      };
      isValid = false;
    }

    if (!validateFullName(place_of_work)) {
      tempError = {
        ...tempError,
        profession: "Place of work should not contain numbers",
      };
      isValid = false;
    }

    if (!validateFullName(department)) {
      tempError = {
        ...tempError,
        profession: "Department should not contain numbers",
      };
      isValid = false;
    }

    if (!validateFullName(country)) {
      tempError = {
        ...tempError,
        profession: "Country should not contain numbers",
      };
      isValid = false;
    }

    if (!validateEmail(email)) {
      tempError = { ...tempError, email: "Invalid email address" };
      isValid = false;
    }

    if (!validatePasswordLength(password)) {
      tempError = {
        ...tempError,
        password: "Password must be at least 6 characters long.",
      };
      isValid = false;
    }

    if (password !== confirm_password) {
      tempError = {
        ...tempError,
        confirm_password: "Confirm Password must be matched with password.",
      };
      isValid = false;
    }

    if (profession === "Doctor" && !pm_number) {
      tempError = {
        ...tempError,
        pm_number: "PMDC is required",
      };
      isValid = false;
    }
    if (profession === "Nurse" && !pm_number) {
      tempError = {
        ...tempError,
        pm_number: "PMNC is required",
      };
      isValid = false;
    }

    if (!picked_image) {
      tempError = {
        ...tempError,
        profile: "Profile picture is required",
      };
      isValid = false;
    }

    if (!cnic) {
      tempError = {
        ...tempError,
        cnic: "CNIC is required",
      };
      isValid = false;
    }

    console.log("Temp errors:::", tempError, "::::isValid:::", isValid)
    setErrors(tempError);
    return isValid;
  };

  async function validateAndSubmit() {
    clearError();
    setIsLoading(true);
    if (handleValidation()) {
      // navigation.navigate('Verification')
      //API calling here
      let data = new FormData();
      data.append("title", selected_title);
      data.append("gender", selected_gender);
      data.append("first_name", firstName);
      data.append("last_name", lastName);
      data.append("profession", profession);
      data.append("place_of_work", place_of_work);
      data.append("department", department);
      data.append("country", country);
      data.append("cnic", cnic);
      if (profession === "Doctor")
        data.append("pmdc", pm_number);
      else if (profession === "Nurse")
        data.append("nurse_number", pm_number);
      data.append("phone_number", phone_number);
      data.append("mobile_number", mobile_number);
      data.append("email", email);
      data.append("password", password);
      data.append('profile_picture', {
        uri: picked_image.uri,
        name: 'profile_image.jpg',
        type: 'image/jpg',
      })

      await postRequest(signup_url, data, null)
        .then((response) => {
          console.log("Response:::", response);
          if (response.status) {
            Toast.show({
              type: "success",
              text1: "Signup",
              text2: response.message,
            });
            navigation.goBack();
          } else {
            Toast.show({
              type: "error",
              text1: "Signup",
              text2: response.message,
            });
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error:", error);
          setIsLoading(false);
        });
    }
    setIsLoading(false);
  }

  return (
    <View
      style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
      className="flex-1 items-center pt-10"
    >
      <StatusBar style={"dark"} />
      {/* View for input fields & login button */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="space-y-3">
          <ArrowLeftIcon
            onPress={() => {
              navigation.goBack();
            }}
            size={hp(3)}
            color={THEME_COLORS.textColor}
          />
          <View>
            <Text
              className={"text-lg font-medium space-y-2"}
              style={{
                color: THEME_COLORS.textColor,
                fontSize: hp(2.5),
                fontFamily: "Poppins-Medium",
              }}
            >
              {GlbalLocale.signup}
            </Text>
          </View>

          {/* Profile picture */}
          <View>
            <View className="items-center justify-center">
              {picked_image ? <Image
                className="rounded-full mb-3"
                style={{
                  width: wp('50%'),
                  height: hp('25%')
                }}
                source={{
                  uri: picked_image?.uri
                }}
              /> :
                <UserCircleIcon color={"gray"} size={hp('20%')} />}
            </View>
            {errors.profile &&
              <Text
                className="text-red-500 text-center"
                style={{
                  fontFamily: "Poppins-Medium"
                }}
              >{errors.profile}</Text>
            }
            {/* Image picker */}
            {<ChooseImage
              setPickedImage={setPickedImage}
              picked_image={picked_image}
            />}
          </View>
          {/* Dropdown for title inputs */}
          <View
            className="border rounded-lg"
            style={{
              borderColor: THEME_COLORS.BORDER_COLOR,
            }}
          >
            <Picker
              className=""
              selectionColor={THEME_COLORS.PRIMARY_COLOR}
              selectedValue={selected_title}
              shouldRasterizeIOS
              onValueChange={(itemValue, itemIndex) =>
                setSelectedTitle(itemValue)
              }
            >
              <Picker.Item label="Mr." value="Mr." />
              <Picker.Item label="Mrs." value="Mrs." />
              <Picker.Item label="Miss" value="Miss" />
              <Picker.Item label="Dr." value="Dr." />
              <Picker.Item label="Prof." value="Prof." />
            </Picker>
          </View>

          {/* First name Input */}
          <CustomInput
            placeholder={GlbalLocale.firstName}
            value={firstName}
            setValue={setFirstName}
            name="username"
            label="First Name"
            error={errors.firstName}
            classes={"my-2"}
          />

          {/* Last name Input */}
          <CustomInput
            placeholder={GlbalLocale.lastName}
            value={lastName}
            setValue={setLastName}
            name="username"
            label="Last Name"
            error={errors.lastName}
            classes={"my-2"}
          />

          {/* Gender details */}
          <View>
            <View
              className="border rounded-lg"
              style={{
                borderColor: THEME_COLORS.BORDER_COLOR,
              }}
            >
              <Picker
                className=""
                selectionColor={THEME_COLORS.PRIMARY_COLOR}
                selectedValue={selected_gender}
                shouldRasterizeIOS
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedGender(itemValue)
                }
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>
          </View>

          {/* Profession Input */}
          <View className="space-y-1">
            <Text
              className={"text-lg font-thin"}
              style={{
                color: THEME_COLORS.GRAY_TEXT,
                fontSize: hp(1.5),
                fontFamily: "Poppins-Regular",
              }}
            >
              {GlbalLocale.profession}
            </Text>
            <View
              className="border rounded-lg"
              style={{
                borderColor: THEME_COLORS.BORDER_COLOR,
              }}
            >
              <Picker
                className=""
                selectionColor={THEME_COLORS.PRIMARY_COLOR}
                selectedValue={profession}
                shouldRasterizeIOS
                placeholder="Profession"
                onValueChange={(itemValue, itemIndex) =>
                  setProfession(itemValue)
                }
              >
                {
                  profession_list.map((prof, index) => (
                    <Picker.Item key={index} label={prof?.name} value={prof?.name} />
                  ))
                }
              </Picker>
            </View>
          </View>

          {/* Place of work Input */}
          <CustomInput
            placeholder={GlbalLocale.place_of_work}
            value={place_of_work}
            setValue={setPlaceOfWork}
            name="place_of_work"
            label="Place of Work"
            error={errors.place_of_work}
            classes={"my-2"}
          />

          {/* Department Input */}
          <CustomInput
            placeholder={GlbalLocale.department}
            value={department}
            setValue={setDepartment}
            name="department"
            label="Department"
            error={errors.department}
            classes={"my-2"}
          />

          {/* PMDC/ PMNC Input */}
          {profession === ("Doctor" || "Nurse") && <CustomInput
            placeholder={
              profession === "Doctor" ? GlbalLocale.pmdc : GlbalLocale.pmnc
            }
            value={pm_number}
            label={profession === "Doctor" ? GlbalLocale.pmdc : GlbalLocale.pmnc}
            setValue={setPmNumber}
            name="pm_number"
            keyboardType="numeric"
            error={errors.pm_number}
            classes={"my-2"}
          />}

          {/* CNIC Input */}
          <CustomInput
            placeholder={GlbalLocale.cnic_without_dash}
            value={cnic}
            setValue={setCnic}
            name="cnic"
            label="CNIC"
            error={errors.cnic}
            classes={"my-2"}
          />

          {/* Country Input */}
          <CustomInput
            placeholder={GlbalLocale.country}
            value={country}
            setValue={setCountry}
            name="country"
            label="Country"
            error={errors.country}
            classes={"my-2"}
          />

          {/* Phone Number Input */}
          <CustomInput
            placeholder={GlbalLocale.phone_number}
            value={phone_number}
            setValue={setPhoneNumber}
            name="phone_number"
            keyboardType="numeric"
            label="Phone Number"
            error={errors.phone_number}
            classes={"my-2"}
          />

          {/* Mobile Number Input */}
          <CustomInput
            placeholder={GlbalLocale.mobile_number}
            value={mobile_number}
            setValue={setMobileNumber}
            name='mobile_number'
            keyboardType="numeric"
            label="Mobile Number"
            error={errors.mobile_number}
            classes={"my-2"}
          />

          {/* Email Input */}
          <CustomInput
            placeholder={GlbalLocale.email}
            value={email}
            setValue={setEmail}
            name="email"
            label="Email"
            error={errors.email}
            classes={"my-2"}
          />
          {/* Email Input */}
          {/* <CustomInput
                        placeholder={GlbalLocale.email}
                        value={confirm_email}
                        setValue={setConfirmEmail}
                        name='email'
                        error={errors.confirm_email}
                        classes={"my-2"}
                    /> */}
          {/* Password Input */}
          <CustomInput
            placeholder={GlbalLocale.password_placeholder}
            value={password}
            setValue={setPassword}
            isSecured={true}
            name="password"
            label="Password"
            error={errors.password}
            classes={"my-2"}
          />

          {/* Password Input */}
          <CustomInput
            placeholder={GlbalLocale.confirm_password}
            value={confirm_password}
            setValue={setConfirmPassword}
            isSecured={true}
            name="password"
            label="Confirm Password"
            error={errors.confirm_password}
            classes={"my-2"}
          />

          {/* Signup button */}
          <View>
            <CustomButton
              text={GlbalLocale.signup}
              onClick={validateAndSubmit}
              isLoading={isLoading}
            />
          </View>
        </View>
        {/* View to show the signup text */}
        <View className="flex-row justify-center items-center mb-3">
          <Text
            className={"text-lg font-medium space-y-2"}
            style={{
              color: THEME_COLORS.textColor,
              fontSize: hp(2),
              fontFamily: "Poppins-Regular",
            }}
          >
            {GlbalLocale.have_account}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text
              className={"text-lg font-medium space-y-2"}
              style={{
                color: THEME_COLORS.PRIMARY_COLOR,
                fontSize: hp(2),
                fontFamily: "Poppins-Medium",
              }}
            >
              {GlbalLocale.signin}!
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* <PopupMessage
                visible={true}
            /> */}
    </View>
  );
}
