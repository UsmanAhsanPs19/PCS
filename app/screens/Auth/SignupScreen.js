import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { THEME_COLORS } from "../../constants/colors";

import { Picker } from "@react-native-picker/picker";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Toast from "react-native-toast-message";
import CustomInput from "../../components/CustomInput";
import { signup_url } from "../../constants/APIEndpoints";
import { GlbalLocale } from "../../constants/locale";
import { postRequest } from "../../helpers/APIRequest";
import CustomButton from "./components/CustomButton";

export default function SignupScreen({ navigation }) {
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
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selected_title, setSelectedTitle] = useState("Mr.");
  const [selected_gender, setSelectedGender] = useState("Male");

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
      tempError = { ...tempError, firstName: "Full name is required" };
      isValid = false;
    }
    if (lastName.trim() === "") {
      tempError = { ...tempError, lastName: "Full name is required" };
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

    if (!validateFullName(firstName)) {
      tempError = {
        ...tempError,
        firstName: "Full name should not contain numbers",
      };
      isValid = false;
    }
    if (!validateFullName(lastName)) {
      tempError = {
        ...tempError,
        lastName: "Full name should not contain numbers",
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
      data.append("phone_number", phone_number);
      data.append("email", email);
      data.append("password", password);

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
          console.log("Error:", error.response.data);
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
        <View className="space-y-4">
          <ArrowLeftIcon
            onPress={() => {
              navigation.goBack();
            }}
            size={hp(3)}
            color={THEME_COLORS.textColor}
          />
          <View>
            <Text
              className={"mb-4 text-lg font-medium space-y-2"}
              style={{
                color: THEME_COLORS.textColor,
                fontSize: hp(2.5),
                fontFamily: "Poppins-Medium",
              }}
            >
              {GlbalLocale.signup}
            </Text>
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
            error={errors.firstName}
            classes={"my-2"}
          />

          {/* Last name Input */}
          <CustomInput
            placeholder={GlbalLocale.lastName}
            value={lastName}
            setValue={setLastName}
            name="username"
            error={errors.lastName}
            classes={"my-2"}
          />

          {/* Gender details */}
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
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>

          {/* Profession Input */}
          <CustomInput
            placeholder={GlbalLocale.profession}
            value={profession}
            setValue={setProfession}
            name="profession"
            error={errors.profession}
            classes={"my-2"}
          />

          {/* Place of work Input */}
          <CustomInput
            placeholder={GlbalLocale.place_of_work}
            value={place_of_work}
            setValue={setPlaceOfWork}
            name="place_of_work"
            error={errors.place_of_work}
            classes={"my-2"}
          />

          {/* Department Input */}
          <CustomInput
            placeholder={GlbalLocale.department}
            value={department}
            setValue={setDepartment}
            name="department"
            error={errors.department}
            classes={"my-2"}
          />

          {/* PMDC/ PMNC Input */}
          <CustomInput
            placeholder={
              profession === "Doctor" ? GlbalLocale.pmdc : GlbalLocale.pmnc
            }
            value={pm_number}
            setValue={setPmNumber}
            name="pm_number"
            error={errors.pm_number}
            classes={"my-2"}
          />

          {/* CNIC Input */}
          <CustomInput
            placeholder={GlbalLocale.cnic_without_dash}
            value={cnic}
            setValue={setCnic}
            name="cnic"
            error={errors.cnic}
            classes={"my-2"}
          />

          {/* Country Input */}
          <CustomInput
            placeholder={GlbalLocale.country}
            value={country}
            setValue={setCountry}
            name="country"
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
            error={errors.phone_number}
            classes={"my-2"}
          />

          {/* Email Input */}
          <CustomInput
            placeholder={GlbalLocale.email}
            value={email}
            setValue={setEmail}
            name="email"
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
