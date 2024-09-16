import { Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { GlbalLocale } from '../../constants/locale'
import CustomInput from '../../components/CustomInput'
import CustomButton from './components/CustomButton'
import { Picker } from '@react-native-picker/picker'
import { getRequest, postRequest } from '../../helpers/APIRequest'
import { check_promo_code_url, confrence_registration, get_bank_details_url, get_participant, get_profession, get_profile, other_confrence_registration } from '../../constants/APIEndpoints'
import Toast from 'react-native-toast-message';
import HeaderOther from './components/HeaderOther'
import { useDispatch, useSelector } from 'react-redux'
import ChooseImage from './components/ChooseImage'
import { UserCircleIcon } from 'react-native-heroicons/solid'
import RadioButton from './components/RadioButton'
import CRadioGroup from './components/CRadioGroup'
import { setAuth } from '../../redux/AuthSlice'
import ModalPicker from 'rn-modal-picker'
import { GENDER_PICKER, TITLE_PICKER } from '../../constants/data'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function RegisterForConference({ navigation, route }) {
    const { user } = useSelector(state => state.AuthStore);
    const { forSelf } = route.params;
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [cnic, setCNIC] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState('');
    const [profession, setProfession] = useState('');
    // const [place_of_work, setPlaceOfWork] = useState('');
    // const [department, setDepartment] = useState('');
    const [country, setCountry] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [picked_image, setPickedImage] = useState("");
    const [picked_payment_profs, setPaymentProf] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const [isPromoLoading, setIsPromoLoading] = useState(false)
    const [errors, setErrors] = useState({});
    const [selected_title, setSelectedTitle] = useState("Mr.")
    const [selected_gender, setSelectedGender] = useState("Male")
    const [partcipants, setParticipants] = useState(null)
    const [bank_details, setBankDetails] = useState(null);
    const [total_amount, setTotalAmount] = useState("");
    const [promo_code, setPromoCode] = useState("");
    const [pm_number, setPmNumber] = useState("");
    const [profile_picture, setProfilePicture] = useState(null)
    const [selected_participants, setSelectedParticipants] = useState(null)
    const [profession_list, setProfessionList] = useState([])
    const [payment_type, setPaymentType] = useState(true);


    useEffect(() => {
        clearError()
    }, [firstName, cnic, lastName, email, profession, country, phone_number, picked_image, selected_title, selected_gender, selected_participants, pm_number]);

    useEffect(() => {
        if (selected_participants) {
            setTotalAmount(selected_participants?.price)
        }
    }, [selected_participants])

    useEffect(() => {
        fillExistingDetails()
        getParticipants();
        getBankDetails();
        getProfessions();
    }, [user])

    useEffect(() => {

    }, [])

    async function getUserData() {
        await getRequest(get_profile)
            .then((respponse) => {
                if (respponse.status) {
                    dispatch(setAuth(respponse.data?.profile));
                }
            })
            .catch((error) => {
                console.log("Error GEt Profile::", error);
            });
    }

    async function fillExistingDetails() {
        if (forSelf) {
            setFirstName(user?.first_name)
            setLastName(user?.second_name)
            setCNIC(user?.cnic)
            setEmail(user?.email)
            setCountry(user?.country)
            // setDepartment(user?.department)
            setSelectedGender(user?.gender)
            setPhoneNumber(user?.phone_number)
            setProfession(user?.profession)
            setSelectedTitle(user?.title)
            setProfilePicture(user?.profile_picture)
        }
    }

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

    function getParticipants() {
        getRequest(get_participant).then(response => {
            if (response.status) {
                setParticipants(response.data)
            }
        }).catch(error => {
            console.log("Error::::", error)
        })
    }

    function getBankDetails() {
        getRequest(get_bank_details_url).then(response => {
            if (response.status) {
                setBankDetails(response.data)
            }
        }).catch(error => {
            console.log("Error::::", error)
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

        if (!selected_participants) {
            tempError = { ...tempError, selected_participants: 'Please select participants' };
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
        // if (place_of_work.trim() === "") {
        //     tempError = { ...tempError, place_of_work: 'Place of work field is required' };
        //     isValid = false;
        // }
        // if (department.trim() === "") {
        //     tempError = { ...tempError, department: 'Department field is required' };
        //     isValid = false;
        // }

        if (cnic?.trim() === "") {
            tempError = { ...tempError, cnic: 'CNIC field is required' };
            isValid = false;
        }

        if (!total_amount & !promo_code) {
            tempError = { ...tempError, total_amount: 'Please select partcipants' };
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

        // if (!validateFullName(place_of_work)) {
        //     tempError = { ...tempError, profession: 'Place of work should not contain numbers' };
        //     isValid = false;
        // }

        // if (!validateFullName(department)) {
        //     tempError = { ...tempError, profession: 'Department should not contain numbers' };
        //     isValid = false;
        // }

        if (!validateFullName(country)) {
            tempError = { ...tempError, profession: 'Country should not contain numbers' };
            isValid = false;
        }

        if (!forSelf && !picked_image) {
            tempError = { ...tempError, picked_image: 'Please choose image.' };
            isValid = false;
        }

        if (payment_type && total_amount > 0 && !picked_payment_profs) {
            tempError = { ...tempError, payment_proof: 'Please add payment proofs.' };
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

        console.log("Temp error::", tempError)

        // if (!picked_image) {
        //     tempError = {
        //         ...tempError,
        //         profile: "Profile picture is required",
        //     };
        //     isValid = false;
        // }
        setErrors(tempError)
        return isValid;
    }

    // Submit API after validation
    async function validateAndSubmit() {
        if (handleValidation()) {
            setIsLoading(true);
            // navigation.navigate('Verification')
            //API calling here
            let data = new FormData();
            data.append("participant_id", selected_participants?.id);
            data.append('title', selected_title);
            data.append('gender', selected_gender);
            data.append('first_name', firstName);
            data.append('last_name', lastName);
            data.append('profession', profession);
            data.append('phone_number', phone_number);
            // data.append('place_of_work', place_of_work);
            // data.append('department', department);
            data.append('country', country);
            data.append("payment_status", payment_type ? 1 : 0);
            if (payment_type) {
                data.append("promo_code", promo_code)
                data.append('file', {
                    uri: picked_payment_profs.uri,
                    name: 'payment_proof_image.jpg',
                    type: 'image/jpg',
                })
            }
            // data.append("mobile_number", mobile_number);
            data.append("cnic", cnic);
            if (profession === "Doctor")
                data.append("pmdc", pm_number);
            else if (profession === "Nurse")
                data.append("nurse_number", pm_number);
            if (picked_image)
                data.append('profile_picture', {
                    uri: picked_image.uri,
                    name: 'profile_image.jpg',
                    type: 'image/jpg',
                })

            try {
                await postRequest(route.params?.forSelf ? confrence_registration : other_confrence_registration, data, null).then(async response => {
                    console.log("Response:::", response)
                    if (response.status) {
                        Toast.show({
                            type: 'success',
                            text1: 'Register Conference',
                            text2: response.message
                        });
                        if (forSelf)
                            await getUserData();
                        navigation.goBack();
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
            } catch (error) {
                setIsLoading(false)
            }
        }
    }

    // async function openPaymentProofPicker() {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     if (!result.canceled) {
    //         setPaymentProf(result.assets[0])
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

    // handler to change particiants
    function onParticipantsChange(item) {
        setSelectedParticipants(item)
    }

    // handler to change particiants
    function onPaymentTypeChange(item) {
        setPaymentType(item)
    }

    function checkPromoCode() {
        let data = new FormData();
        data.append('promo_code', promo_code);
        data.append('participant_id', selected_participants?.id);
        setIsPromoLoading(true)
        postRequest(check_promo_code_url, data).then(response => {
            Toast.show({
                text1: "Promo code",
                text2: response?.message || (response.status && "Promo code success"),
                type: response.status ? "success" : "error"
            })
            if (response.status) {
                setTotalAmount("0")
            }
            setIsPromoLoading(false)
        }).catch(error => {
            setIsPromoLoading(false)
            console.log("Error promo check:::", error)
        })
    }

    return (
        <View
            style={{ backgroundColor: THEME_COLORS.BG_COLOR }}
            className="flex-1 px-4 pt-10"
        >
            <StatusBar style={'dark'} />
            <View style={{ width: "100%" }}
                className=""
            >
                <HeaderOther
                    onPress={() => {
                        navigation.goBack()
                    }}
                    label={GlbalLocale.register_for_confrence}
                />
            </View>

            {/* View for input fields & login button */}
            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* User personal details */}
                    <View className="space-y-2">
                        <View>
                            <View className="items-center justify-center">
                                {profile_picture && !picked_image ?
                                    <Image
                                        className="bg-gray-50 rounded-full mb-3"
                                        style={{
                                            width: wp('50%'),
                                            height: hp('25%')
                                        }}
                                        source={{
                                            uri: (profile_picture && `${profile_picture}`)
                                        }}
                                    />
                                    :
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
                            {errors.picked_image &&
                                <Text
                                    className="text-red-500 text-center"
                                    style={{
                                        fontFamily: "Poppins-Medium"
                                    }}
                                >{errors.picked_image}</Text>
                            }
                            {/* Image picker */}
                            {(!forSelf || !profile_picture) && <ChooseImage
                                setPickedImage={setPickedImage}
                                picked_image={picked_image}
                            />}
                        </View>


                        {/* Dropdown for title inputs */}
                        <View className="border rounded-lg"
                            style={{
                                borderColor: THEME_COLORS.BORDER_COLOR
                            }}
                        >
                            {Platform.OS === "ios" && <ModalPicker
                                value={selected_title}
                                data={TITLE_PICKER}
                                animationType={"slide"}
                                enabled={forSelf ? false : true}
                                pickerContainerStyle={styles.pickerStyle}
                                // dropDownIcon={require("./res/ic_drop_down.png")}
                                selectedTextStyle={styles.selectedTextStyle}
                                listTextStyle={styles.listTextStyle}
                                placeHolderText={"Please select profession"}
                                placeHolderTextColor={"black"}
                                onChange={(value) => {
                                    setSelectedTitle(value);
                                }}
                            />}
                            {Platform.OS === "android" && <Picker
                                className=""
                                enabled={forSelf ? false : true}
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
                            </Picker>}
                        </View>



                        {/* First name Input */}
                        <CustomInput
                            placeholder={GlbalLocale.firstName}
                            value={firstName}
                            setValue={setFirstName}
                            name='username'
                            editable={!forSelf}
                            error={errors.firstName}
                            classes={"my-2"}
                        />

                        {/* Last name Input */}
                        <CustomInput
                            placeholder={GlbalLocale.lastName}
                            value={lastName}
                            setValue={setLastName}
                            name='username'
                            editable={!forSelf}
                            error={errors.lastName}
                            classes={"my-2"}
                        />

                        {/* CNIC Input */}
                        <CustomInput
                            placeholder={GlbalLocale.cnic}
                            value={cnic}
                            setValue={setCNIC}
                            name='cnic'
                            keyboardType='numeric'
                            error={errors.cnic}
                            classes={"my-2"}
                        />

                        {/* Gender details */}
                        <View className="border rounded-lg"
                            style={{
                                borderColor: THEME_COLORS.BORDER_COLOR
                            }}
                        >
                            {Platform.OS === "ios" && <ModalPicker
                                value={selected_gender}
                                data={GENDER_PICKER}
                                animationType={"slide"}
                                enabled={forSelf ? false : true}
                                pickerContainerStyle={styles.pickerStyle}
                                // dropDownIcon={require("./res/ic_drop_down.png")}
                                selectedTextStyle={styles.selectedTextStyle}
                                listTextStyle={styles.listTextStyle}
                                placeHolderText={"Please select profession"}
                                placeHolderTextColor={"black"}
                                onChange={(value) => {
                                    setSelectedGender(value);
                                }}
                            />}
                            {Platform.OS === "android" && <Picker
                                className=""
                                enabled={forSelf ? false : true}
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

                        {/* Place of work Input */}
                        {/* <CustomInput
                        placeholder={GlbalLocale.place_of_work}
                        value={place_of_work}
                        setValue={setPlaceOfWork}
                        name='place_of_work'
                        editable={!forSelf}
                        error={errors.place_of_work}
                        classes={"my-2"}
                    /> */}

                        {/* Department Input */}
                        {/* <CustomInput
                        placeholder={GlbalLocale.department}
                        value={department}
                        setValue={setDepartment}
                        name='department'
                        editable={!forSelf}
                        error={errors.department}
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
                                        console.log("values:::", value)
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

                        {/* PMDC/ PMNC Input */}
                        {(profession === "Doctor" || profession === "Nurse") && <CustomInput
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


                        {/* Country Input */}
                        <CustomInput
                            placeholder={GlbalLocale.country}
                            value={country}
                            setValue={setCountry}
                            name='country'
                            editable={!forSelf}
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
                            editable={!forSelf}
                            error={errors.phone_number}
                            classes={"my-2"}
                        />

                        {/* Mobile Number Input */}
                        {/* <CustomInput
                        placeholder={GlbalLocale.mobile_number}
                        value={mobile_number}
                        setValue={setMobileNumber}
                        name='mobile_number'
                        keyboardType="numeric"
                        label="Mobile Number"
                        error={errors.
                        }
                        classes={"my-2"}
                    /> */}

                        {/* Email Input */}
                        <CustomInput
                            placeholder={GlbalLocale.email}
                            value={email}
                            setValue={setEmail}
                            name='email'
                            editable={!forSelf}
                            error={errors.email}
                            classes={"my-2"}
                        />
                    </View>

                    {/* View for the participants */}

                    <View className={`${errors.selected_participants ? "border border-red-600 p-2" : ""} space-y-1`}
                    >
                        <Text
                            className="font-bold text-lg"
                            style={{
                                fontFamily: "Poppins-Bold"
                            }}
                        >{GlbalLocale.registration_fee}</Text>
                        <RadioButton
                            options={partcipants || []}
                            onSelect={onParticipantsChange}
                        />
                        {errors.selected_participants &&
                            <Text
                                className="text-red-500"
                                style={{
                                    fontFamily: "Poppins-Medium"
                                }}
                            >{errors.selected_participants}</Text>
                        }
                    </View>

                    {/* View for the bank details */}
                    <View className={`${errors.selected_participants ? "border border-red-600 p-2" : ""} space-y-2 my-2`}
                    >
                        <Text
                            className="text-lg font-bold"
                            style={{
                                fontFamily: "Poppins-Bold"
                            }}
                        >{GlbalLocale.account_details}</Text>

                        <Text
                            className="text-base underline"
                            style={{
                                fontFamily: "Poppins-SemiBold"
                            }}
                        >{GlbalLocale.account_tag_line}</Text>
                        <View className="space-y-2">
                            <View className="flex-row">
                                <Text
                                    className="text-base underline"
                                    style={{
                                        fontFamily: "Poppins-SemiBold"
                                    }}
                                >{GlbalLocale.account_title}:</Text>
                                <Text
                                    className="text-base"
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                > {bank_details?.bank_title}</Text>
                            </View>
                            <View className="flex-row">
                                <Text
                                    className="text-base underline"
                                    style={{
                                        fontFamily: "Poppins-SemiBold"
                                    }}
                                >{GlbalLocale.account_number}:</Text>
                                <Text
                                    className="text-lg"
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                > {bank_details?.bank_account}</Text>
                            </View>
                            <View className="flex-row">
                                <Text
                                    className="text-base"
                                    style={{
                                        fontFamily: "Poppins-SemiBold"
                                    }}
                                >{GlbalLocale.bank_name}: </Text>
                                <Text
                                    className="text-base"
                                    style={{
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >{bank_details?.bank_name}</Text>
                            </View>
                            <Text
                                className="text-lg text-red-500"
                                style={{
                                    fontFamily: "Poppins-Medium"
                                }}
                            >Noted: Account details are mentioned</Text>
                        </View>
                    </View>

                    {/* Total amount section */}
                    <CustomInput
                        placeholder={GlbalLocale.total_amount}
                        value={total_amount + ""}
                        setValue={setTotalAmount}
                        name='amount'
                        editable={false}
                        keyboardType='default'
                        error={errors.total_amount}
                        classes={"my-2"}
                    />

                    {/* Pay now or later section */}
                    <View className="mt-5 space-y-2">
                        <Text
                            className="font-normal text-base"
                            style={{
                                fontFamily: "Poppins-Medium"
                            }}
                        >{GlbalLocale.payment_type}</Text>
                        <CRadioGroup
                            options={[{ label: "Pay Now", value: true }, { label: "Pay Later", value: false }] || []}
                            onSelect={onPaymentTypeChange}
                        />
                        {/* <RadioButtonGroup
                        containerStyle={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-evenly" }}
                        selected={payment_type}
                        onSelected={(value) => setPaymentType(value)}
                        radioBackground={THEME_COLORS.PRIMARY_COLOR}
                    >
                        <RadioButtonItem value={1}
                            // label={
                            //     <Text style={{ color: THEME_COLORS.textColor, fontFamily: "Poppins-Medium" }}>Pay Now</Text>
                            // }
                            label="Pay Now"
                        />
                        <RadioButtonItem
                            value={0}
                            // label={
                            //     <Text className="self-center" style={{ color: THEME_COLORS.textColor, fontFamily: "Poppins-Medium" }}>Pay Later</Text>
                            // }
                            label="Pay Later"
                        />
                    </RadioButtonGroup> */}
                    </View>

                    {/* Add payment proof picker */}
                    {(total_amount != 0 && payment_type) ?
                        <View className="my-2" >
                            <ChooseImage
                                heading={"Payment Proof Picture"}
                                setPickedImage={setPaymentProf}
                                picked_image={picked_payment_profs}
                            />
                        </View> : <></>
                    }

                    {payment_type ? <View>
                        {/* Promo code section */}
                        <CustomInput
                            placeholder={GlbalLocale.promo_code}
                            value={promo_code}
                            setValue={setPromoCode}
                            name='promo'
                            keyboardType='default'
                            error={errors.total_amount}
                            classes={"my-2"}
                        />
                        <View>
                            <CustomButton
                                text={GlbalLocale.check_code}
                                onClick={checkPromoCode}
                                isLoading={isPromoLoading}
                            />
                        </View>
                    </View> : <></>}


                    {/* Submit button */}
                    <View>
                        <CustomButton
                            text={GlbalLocale.submit}
                            onClick={validateAndSubmit}
                            isLoading={isLoading}
                        />
                    </View>
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