import { Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { GlbalLocale } from '../../constants/locale'
import CustomInput from '../../components/CustomInput'
import CustomButton from './components/CustomButton'
import { Picker } from '@react-native-picker/picker'
import { getRequest, MEDIA_BASE_URL, postRequest } from '../../helpers/APIRequest'
import { get_profession, get_profile, update_user } from '../../constants/APIEndpoints'
import Toast from 'react-native-toast-message';
import HeaderOther from './components/HeaderOther'
import { useDispatch, useSelector } from 'react-redux'
import ChooseImage from './components/ChooseImage'
import { UserCircleIcon } from 'react-native-heroicons/solid'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setAuth } from '../../redux/AuthSlice'
import ModalPicker from 'rn-modal-picker'
import { TITLE_PICKER } from '../../constants/data'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
    const [profession_list, setProfessionList] = useState([])


    useEffect(() => {
        fillExistingDetails()
    }, [])

    async function fillExistingDetails() {
        console.log("Token data:::", user)
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

    useEffect(() => {
        getProfessions()
    }, [])

    async function getProfessions() {
        await getRequest(get_profession)
            .then((response) => {
                console.log("getProfessions Data::", response);
                if (response.status && response.data) {
                    let temp_profession = []
                    response.data?.map(val => {
                        temp_profession = [...temp_profession, { name: val?.name, id: val?.name }]
                    })
                    setProfessionList(temp_profession)
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

    async function getUserData() {
        setIsProfileLoading(true)
        await getRequest(get_profile).then(response => {
            if (response.status) {
                dispatch(setAuth(response.data?.profile));
                fillExistingDetails()
                setPickedImage(null)
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
            // if (picked_image)
            data.append('profile_picture', {
                uri: picked_image?.uri,
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

    // async function openImagePicker() {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     if (!result.canceled) {
    //         setPickedImage(result.assets[0])
    //     }
    //     else {
    //         Toast.show({
    //             text1: "Pick Image",
    //             text2: "User cancelled the process",
    //             type: "error",
    //             text1Style: {
    //                 fontFamily: "Poppins-Regular"
    //             },
    //             text2Style: {
    //                 fontFamily: "Poppins-Regular"
    //             }
    //         })
    //     }
    // }

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
            <KeyboardAwareScrollView contentContainerStyle={{ paddingHorizontal: Platform.OS === "ios" && 10, flex: 1 }}>
                <ScrollView
                    scrollEnabled={!isLoading}
                    showsVerticalScrollIndicator={false}
                >
                    <View className="space-y-4">

                        <View className="items-center justify-center">
                            {user?.profile_picture && !picked_image ? <Image
                                className="bg-gray-50 rounded-full mb-3"
                                style={{
                                    width: wp('50%'),
                                    height: hp('25%')
                                }}
                                source={{
                                    uri: (user?.profile_picture && `${MEDIA_BASE_URL}/${user?.profile_picture}`)
                                }}
                            /> :
                                picked_image ?
                                    <Image
                                        className="bg-gray-50 rounded-full mb-3"
                                        style={{
                                            width: wp('50%'),
                                            height: hp('25%')
                                        }}
                                        source={{
                                            uri: picked_image?.uri
                                        }}
                                    />
                                    :
                                    <UserCircleIcon color={"gray"} size={hp('20%')} />}
                        </View>
                        {/* Image picker */}
                        <ChooseImage
                            setPickedImage={setPickedImage}
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
                            {Platform.OS === "ios" && <ModalPicker
                                value={selected_title}
                                data={TITLE_PICKER}
                                animationType={"slide"}
                                pickerContainerStyle={styles.pickerStyle}
                                // dropDownIcon={require("./res/ic_drop_down.png")}
                                selectedTextStyle={styles.selectedTextStyle}
                                listTextStyle={styles.listTextStyle}
                                placeHolderText={"Please select title"}
                                placeHolderTextColor={"black"}
                                onChange={(value) => {
                                    setSelectedTitle(value);
                                }}
                            />}
                            {Platform.OS === "android" && <Picker
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
                            </Picker>}
                        </View>

                        {/* Profession Input */}
                        {/* <CustomInput
                        placeholder={GlbalLocale.profession}
                        value={profession}
                        setValue={setProfession}
                        name='profession'
                        error={errors.profession}
                        classes={"my-2"}
                    /> */}
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
                                {Platform.OS === "ios" && <ModalPicker
                                    value={profession}
                                    data={profession_list}
                                    animationType={"slide"}
                                    pickerContainerStyle={styles.pickerStyle}
                                    // dropDownIcon={require("./res/ic_drop_down.png")}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    listTextStyle={styles.listTextStyle}
                                    placeHolderText={"Please select profession"}
                                    placeHolderTextColor={"black"}
                                    onChange={(value) => {
                                        setProfession(value);
                                    }}
                                />}
                                {Platform.OS === "android" && <Picker
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
                                </Picker>}
                            </View>
                        </View>

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
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    pickerStyle: {
        height: "auto",
        width: "100%",
        marginVertical: 10,
        borderColor: "transparent",
        alignItems: "center",
        alignSelf: "center",
        padding: 5,
        backgroundColor: "white",
        borderRadius: 5,
        borderWidth: 1.5,
        fontSize: 16,
        color: "#000",
    },
    selectedTextStyle: {
        paddingLeft: 5,
        color: "#000",
        textAlign: "right",
    },
    listTextStyle: {
        color: "#000",
        textAlign: "right",
    },
});