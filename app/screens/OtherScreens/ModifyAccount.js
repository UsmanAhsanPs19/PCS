import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { GlbalLocale } from '../../constants/locale'
import CustomInput from '../../components/CustomInput'
import CustomButton from './components/CustomButton'
import { Picker } from '@react-native-picker/picker'
import { getRequest, postRequest } from '../../helpers/APIRequest'
import { get_profile, signup_url, update_user } from '../../constants/APIEndpoints'
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import HeaderOther from './components/HeaderOther'
import { useDispatch, useSelector } from 'react-redux'
import ChooseImage from './components/ChooseImage'
import { UserCircleIcon } from 'react-native-heroicons/solid'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setAuth } from '../../redux/AuthSlice'

export default function ModifyAccount({ navigation }) {
    const { user } = useSelector(state => state.AuthStore);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState('');
    const [profession, setProfession] = useState('');
    const [place_of_work, setPlaceOfWork] = useState('');
    const [department, setDepartment] = useState('');
    const [country, setCountry] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [mobile_number, setMobileNumber] = useState('');
    const [picked_image, setPickedImage] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({});
    const [selected_title, setSelectedTitle] = useState("Mr.")
    const [selected_gender, setSelectedGender] = useState("Male")
    const [is_profile_loading, setIsProfileLoading] = useState(false)


    useEffect(() => {
        fillExistingDetails()
    }, [])

    async function fillExistingDetails() {
        console.log("Token data:::", await AsyncStorage.getItem('token'))
        setFirstName(user?.first_name)
        setLastName(user?.second_name)
        setEmail(user?.email)
        setCountry(user?.country)
        setDepartment(user?.department)
        setSelectedGender(user?.gender)
        setPhoneNumber(user?.phone_number)
        setMobileNumber(user?.mobile_number)
        setPlaceOfWork(user?.place_of_work)
        setProfession(user?.profession)
        setSelectedTitle(user?.title)
    }

    async function getUserData() {
        setIsProfileLoading(true)
        await getRequest(get_profile).then(response => {
            if (response.status) {
                dispatch(setAuth(response.data?.profile));
            }
            else {
                Toast.show({
                    text1: "Sync Profile Data",
                    text2: response.message,
                    type: "error",
                    text1Style: {
                        fontFamily: "Poppins-Regular"
                    },
                    text2Style: {
                        fontFamily: "Poppins-Regular"
                    }
                })
            }
            setIsProfileLoading(false)
        }).catch(error => {
            setIsProfileLoading(false)
            console.log("Error GEt Profile::", error)
        })
    }

    //Check if full name contains any numbers
    const validateFullName = (fullName) => {
        const re = /\d/;
        return !re.test(fullName);
    };


    function clearError() {
        setErrors({})
    }

    const handleValidation = () => {
        let isValid = true;
        let tempError = { ...errors };

        if (firstName.trim() === "") {
            tempError = { ...tempError, firstName: 'Full name is required' };
            isValid = false;
        }
        if (lastName.trim() === "") {
            tempError = { ...tempError, lastName: 'Full name is required' };
            isValid = false;
        }
        if (profession.trim() === "") {
            tempError = { ...tempError, profession: 'Profession field is required' };
            isValid = false;
        }
        if (place_of_work.trim() === "") {
            tempError = { ...tempError, place_of_work: 'Place of work field is required' };
            isValid = false;
        }
        if (department.trim() === "") {
            tempError = { ...tempError, department: 'Department field is required' };
            isValid = false;
        }

        if (country.trim() === "") {
            tempError = { ...tempError, country: 'Country is required' };
            isValid = false;
        }

        if (phone_number.trim() === "") {
            tempError = { ...tempError, phone_number: 'Phone number is required' };
            isValid = false;
        }

        if (!validateFullName(firstName)) {
            tempError = { ...tempError, firstName: 'Full name should not contain numbers' };
            isValid = false;
        }
        if (!validateFullName(lastName)) {
            tempError = { ...tempError, lastName: 'Full name should not contain numbers' };
            isValid = false;
        }

        if (!validateFullName(profession)) {
            tempError = { ...tempError, profession: 'Profession should not contain numbers' };
            isValid = false;
        }

        if (!validateFullName(place_of_work)) {
            tempError = { ...tempError, profession: 'Place of work should not contain numbers' };
            isValid = false;
        }

        if (!validateFullName(department)) {
            tempError = { ...tempError, profession: 'Department should not contain numbers' };
            isValid = false;
        }

        if (!validateFullName(country)) {
            tempError = { ...tempError, profession: 'Country should not contain numbers' };
            isValid = false;
        }

        setErrors(tempError)
        return isValid;
    }


    async function validateAndSubmit() {
        clearError();
        setIsLoading(true);
        if (handleValidation()) {
            // navigation.navigate('Verification')
            //API calling here
            let data = new FormData();
            data.append('title', selected_title);
            data.append('gender', selected_gender);
            data.append('first_name', firstName);
            data.append('last_name', lastName);
            data.append('profession', profession);
            data.append('place_of_work', place_of_work);
            data.append('department', department);
            data.append('country', country);
            data.append('phone_number', phone_number);
            data.append('mobile_number', mobile_number);
            data.append('profile_picture', {
                uri: picked_image.uri,
                name: 'profile_image.jpg',
                type: 'image/jpg',
            })

            await postRequest(update_user, data, null).then(response => {
                console.log("Response:::", response)
                if (response.status) {
                    Toast.show({
                        type: 'success',
                        text1: 'Modify Account',
                        text2: response.message
                    });
                    getUserData()
                }
                else {
                    Toast.show({
                        type: 'error',
                        text1: 'Modify Account',
                        text2: response.message
                    });
                }
                setIsLoading(false)
            }).catch(error => {
                setIsLoading(false)
                console.log("Error:", error.response)

            })
        }
    }

    async function openImagePicker() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setPickedImage(result.assets[0])
        }
        else {
            Toast.show({
                text1: "Pick Image",
                text2: "User cancelled the process",
                type: "error",
                text1Style: {
                    fontFamily: "Poppins-Regular"
                },
                text2Style: {
                    fontFamily: "Poppins-Regular"
                }
            })
        }
    }

    return (
        <View
            style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
            className="flex-1 items-center pt-10"
        >
            <StatusBar style={'dark'} />
            <View style={{ width: "100%" }}
                className="mb-5 px-3"
            >
                <HeaderOther
                    onPress={() => {
                        navigation.goBack()
                    }}
                    label={GlbalLocale.modify_account}
                />
            </View>

            {/* View for input fields & login button */}
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View className="space-y-4">

                    <View className="items-center justify-center">
                        {user?.profile_picture || picked_image ? <Image
                            className="rounded-full mb-3"
                            style={{
                                width: wp('50%'),
                                height: hp('25%')
                            }}
                            source={{ uri: user?.profile_picture || picked_image?.uri }}
                        /> :
                            <UserCircleIcon color={"gray"} size={hp('20%')} />}
                    </View>
                    {/* Image picker */}
                    <ChooseImage
                        openImagePicker={openImagePicker}
                        picked_image={picked_image}
                    />

                    {/* Dropdown for title inputs */}
                    <View className="border rounded-lg"
                        style={{
                            borderColor: THEME_COLORS.BORDER_COLOR
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
                        name='username'
                        error={errors.firstName}
                        classes={"my-2"}
                    />

                    {/* Last name Input */}
                    <CustomInput
                        placeholder={GlbalLocale.lastName}
                        value={lastName}
                        setValue={setLastName}
                        name='username'
                        error={errors.lastName}
                        classes={"my-2"}
                    />

                    {/* Gender details */}
                    <View className="border rounded-lg"
                        style={{
                            borderColor: THEME_COLORS.BORDER_COLOR
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
                        name='profession'
                        error={errors.profession}
                        classes={"my-2"}
                    />

                    {/* Place of work Input */}
                    <CustomInput
                        placeholder={GlbalLocale.place_of_work}
                        value={place_of_work}
                        setValue={setPlaceOfWork}
                        name='place_of_work'
                        error={errors.place_of_work}
                        classes={"my-2"}
                    />

                    {/* Department Input */}
                    <CustomInput
                        placeholder={GlbalLocale.department}
                        value={department}
                        setValue={setDepartment}
                        name='department'
                        error={errors.department}
                        classes={"my-2"}
                    />

                    {/* Country Input */}
                    <CustomInput
                        placeholder={GlbalLocale.country}
                        value={country}
                        setValue={setCountry}
                        name='country'
                        error={errors.country}
                        classes={"my-2"}
                    />

                    {/* Phone Number Input */}
                    <CustomInput
                        placeholder={GlbalLocale.phone_number}
                        value={phone_number}
                        setValue={setPhoneNumber}
                        name='phone_number'
                        keyboardType='numeric'
                        error={errors.phone_number}
                        classes={"my-2"}
                    />

                    {/* Phone Number Input */}
                    <CustomInput
                        placeholder={GlbalLocale.phone_number}
                        value={mobile_number}
                        setValue={setMobileNumber}
                        name='mobile_number'
                        keyboardType='numeric'
                        error={errors.phone_number}
                        classes={"my-2"}
                    />

                    {/* Email Input */}
                    <CustomInput
                        placeholder={GlbalLocale.email}
                        value={email}
                        setValue={setEmail}
                        name='email'
                        editable={false}
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
                    {/* <CustomInput
                        placeholder={GlbalLocale.password_placeholder}
                        value={password}
                        setValue={setPassword}
                        isSecured={true}
                        name='password'
                        error={errors.password}
                        classes={"my-2"}
                    /> */}

                    {/* Password Input */}
                    {/* <CustomInput
                        placeholder={GlbalLocale.confirm_password}
                        value={confirm_password}
                        setValue={setConfirmPassword}
                        isSecured={true}
                        name='password'
                        error={errors.confirm_password}
                        classes={"my-2"}
                    /> */}

                    {/* Signup button */}
                    <View>
                        <CustomButton
                            text={GlbalLocale.update}
                            onClick={validateAndSubmit}
                            isLoading={isLoading}
                        />
                    </View>
                </View>
                {/* View to show the signup text */}

            </ScrollView>
        </View>
    )
}