import { Image, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { THEME_COLORS } from '../../constants/colors'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { GlbalLocale } from '../../constants/locale'
import CustomInput from '../../components/CustomInput'
import CustomButton from './components/CustomButton'
import { Picker } from '@react-native-picker/picker'
import { getRequest, postRequest } from '../../helpers/APIRequest'
import { check_promo_code_url, get_bank_details_url, get_participant, update_user } from '../../constants/APIEndpoints'
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import HeaderOther from './components/HeaderOther'
import { useSelector } from 'react-redux'
import ChooseImage from './components/ChooseImage'
import { UserCircleIcon } from 'react-native-heroicons/solid'
import RadioButton from './components/RadioButton'

export default function RegisterForConference({ navigation, route }) {
    const { user } = useSelector(state => state.AuthStore);
    const [firstName, setFirstName] = useState("");
    const [cnic, setCNIC] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState('');
    const [profession, setProfession] = useState('');
    const [place_of_work, setPlaceOfWork] = useState('');
    const [department, setDepartment] = useState('');
    const [country, setCountry] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [picked_image, setPickedImage] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const [isPromoLoading, setIsPromoLoading] = useState(false)
    const [errors, setErrors] = useState({});
    const [selected_title, setSelectedTitle] = useState("Mr.")
    const [selected_gender, setSelectedGender] = useState("Male")
    const [partcipants, setParticipants] = useState(null)
    const [bank_details, setBankDetails] = useState(null);
    const [total_amount, setTotalAmount] = useState("");
    const [promo_code, setPromoCode] = useState("");
    const [selected_participants, setSelectedParticipants] = useState(null)

    useEffect(() => {
        clearError()
    }, [firstName, cnic, lastName, email, profession, place_of_work, department, country, phone_number, picked_image, selected_title, selected_gender, selected_participants]);

    useEffect(() => {
        if (selected_participants) {
            console.log("Price:::", selected_participants?.price)
            setTotalAmount(selected_participants?.price)
        }
    }, [selected_participants])

    useEffect(() => {
        fillExistingDetails()
        getParticipants();
        getBankDetails();
    }, [])

    async function fillExistingDetails() {
        setFirstName(user?.first_name)
        setLastName(user?.second_name)
        setEmail(user?.email)
        setCountry(user?.country)
        setDepartment(user?.department)
        setSelectedGender(user?.gender)
        setPhoneNumber(user?.phone_number)
        setPlaceOfWork(user?.place_of_work)
        setProfession(user?.profession)
        setSelectedTitle(user?.title)
    }

    function getParticipants() {
        getRequest(get_participant).then(response => {
            console.log("Participants:::", response)
            if (response.status) {
                setParticipants(response.data)
            }
        }).catch(error => {
            console.log("Error::::", error)
        })
    }

    function getBankDetails() {
        getRequest(get_bank_details_url).then(response => {
            console.log("Bank Details:::", response)
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

        if (cnic.trim() === "") {
            tempError = { ...tempError, cnic: 'CNIC field is required' };
            isValid = false;
        }

        if (!total_amount.trim()) {
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

    // Submit API after validation
    async function validateAndSubmit() {
        if (handleValidation()) {
            setIsLoading(true);
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

    // handler to change particiants
    function onParticipantsChange(item) {
        setSelectedParticipants(item)
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
                className="px-3"
            >
                <HeaderOther
                    onPress={() => {
                        navigation.goBack()
                    }}
                    label={GlbalLocale.register_for_confrence}
                />
            </View>

            {/* View for input fields & login button */}
            <ScrollView
                contentContainerStyle={{
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* User personal details */}
                <View className="space-y-2">

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
                    {(!route.params?.forSelf || !user.profile_picture) && <ChooseImage
                        openImagePicker={openImagePicker}
                        picked_image={picked_image}
                    />}

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

                    {/* Dropdown for title inputs */}
                    <View className="border rounded-lg"
                        style={{
                            borderColor: THEME_COLORS.BORDER_COLOR
                        }}
                    >
                        <Picker
                            className=""
                            enabled={route.params?.forSelf ? false : true}
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
                        editable={!route.params?.forSelf}
                        error={errors.firstName}
                        classes={"my-2"}
                    />

                    {/* Last name Input */}
                    <CustomInput
                        placeholder={GlbalLocale.lastName}
                        value={lastName}
                        setValue={setLastName}
                        name='username'
                        editable={!route.params?.forSelf}
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
                            enabled={route.params?.forSelf ? false : true}
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
                        editable={!route.params?.forSelf}
                        error={errors.profession}
                        classes={"my-2"}
                    />

                    {/* Place of work Input */}
                    <CustomInput
                        placeholder={GlbalLocale.place_of_work}
                        value={place_of_work}
                        setValue={setPlaceOfWork}
                        name='place_of_work'
                        editable={!route.params?.forSelf}
                        error={errors.place_of_work}
                        classes={"my-2"}
                    />

                    {/* Department Input */}
                    <CustomInput
                        placeholder={GlbalLocale.department}
                        value={department}
                        setValue={setDepartment}
                        name='department'
                        editable={!route.params?.forSelf}
                        error={errors.department}
                        classes={"my-2"}
                    />

                    {/* Country Input */}
                    <CustomInput
                        placeholder={GlbalLocale.country}
                        value={country}
                        setValue={setCountry}
                        name='country'
                        editable={!route.params?.forSelf}
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
                        editable={!route.params?.forSelf}
                        error={errors.phone_number}
                        classes={"my-2"}
                    />

                    {/* Email Input */}
                    <CustomInput
                        placeholder={GlbalLocale.email}
                        value={email}
                        setValue={setEmail}
                        name='email'
                        editable={!route.params?.forSelf}
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
                    value={total_amount}
                    setValue={setTotalAmount}
                    name='amount'
                    editable={false}
                    keyboardType='default'
                    error={errors.total_amount}
                    classes={"my-2"}
                />

                <View>
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
                </View>


                {/* Submit button */}
                <View>
                    <CustomButton
                        text={GlbalLocale.update}
                        onClick={validateAndSubmit}
                        isLoading={isLoading}
                    />
                </View>
            </ScrollView>
        </View>
    )
}