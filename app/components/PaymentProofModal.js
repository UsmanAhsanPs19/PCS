import React, { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { GlbalLocale } from '../constants/locale';
import CustomInput from './CustomInput';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from '../screens/OtherScreens/components/CustomButton';
import ChooseImage from '../screens/OtherScreens/components/ChooseImage';
import { THEME_COLORS } from '../constants/colors';
import { check_promo_code_url, save_payment_proof } from '../constants/APIEndpoints';
import { postRequest } from '../helpers/APIRequest';
import Toast from 'react-native-toast-message';

function PaymentProofModal({ isModalVisible, selectedData, onCloseModel }) {
    const [paymentProof, setPaymentProof] = useState(null);
    const [promoCode, setPromoCode] = useState('');
    const [promo_verified, setPromosVerified] = useState(false)
    const [errors, setErrors] = useState({});
    const [isPromoLoading, setIsPromoLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function clearValues() {
        setErrors({})
        setPaymentProof(null)
        setPromosVerified(false)
        setPromoCode("")
        setIsLoading(false)
    }

    useEffect(() => {
        setErrors({})
    }, [promoCode, paymentProof])

    const checkPromoCode = () => {
        // Function to check promo code
        let data = new FormData();
        data.append('promo_code', promoCode);
        data.append('participant_id', selectedData?.participant_id);
        setIsPromoLoading(true)
        postRequest(check_promo_code_url, data).then(response => {
            if (response.status) {
                setPromosVerified(true)
            }
            else {
                setPromoCode("")
                setErrors(prevErrors => ({
                    ...prevErrors,
                    promoCode: response.message || response.error?.message || "Issue while applying promocode. Try again later"
                }));
            }
            setIsPromoLoading(false)
        }).catch(error => {
            setIsPromoLoading(false)
            console.log("Error promo check:::", error)
        })
    };


    function isValidated() {
        let isValid = true;
        let tempError = { ...errors };

        if (!paymentProof && !promoCode) {
            tempError = { ...tempError, paymentProof: 'Payment Proof is required' };
            isValid = false;
        }

        if (promoCode && !promo_verified) {
            tempError = { ...tempError, promoCode: 'Please click on check now button to verify the promo code.' };
            isValid = false;
        }
        setErrors(tempError)
        return isValid;
    }

    const validateAndSubmit = () => {
        // Function to validate and submit form
        if (isValidated()) {
            setIsLoading(true)
            let data = new FormData();
            data.append('registration_id', selectedData?.id);
            data.append('total_amount', selectedData?.amount);
            if (!paymentProof)
                data.append('promo_code', promoCode);
            if (!promoCode) {
                data.append('file', {
                    uri: paymentProof.uri,
                    name: 'payment_proof_image.jpg',
                    type: 'image/jpg',
                })
            }
            data.append('payment_status', 1)
            postRequest(save_payment_proof, data).then(response => {
                setIsLoading(false)
                if (response.status) {
                    Toast.show({
                        type: 'success',
                        text1: 'Payment Proof',
                        text2: response.message,
                        autoHide: true
                    });
                    clearAndClose();
                } else {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        paymentProof: response.message || response.error?.message || "Issue while submitting request. Try again later"
                    }));
                }
            })
                .catch(error => {
                    setIsLoading(false)
                    console.log("Error::", error)
                })
        }
    };

    function clearAndClose() {
        clearValues()
        onCloseModel()
    }

    return (
        <Modal isVisible={isModalVisible} backdropColor="black" backdropOpacity={0.5}>
            <View style={styles.modalView}>
                <Text
                    className={"text-lg font-thin my-3"}
                    style={{
                        color: THEME_COLORS.textColor,
                        fontFamily: "Poppins-SemiBold",
                    }}
                >
                    Payment Proof
                </Text>
                {/* Add payment proof picker */}
                <View className="my-2 w-full">
                    <ChooseImage
                        heading="Payment Proof Picture"
                        setPickedImage={setPaymentProof}
                        picked_image={paymentProof}
                    />
                    {errors.paymentProof &&
                        <Text
                            className="text-red-500 text-center"
                            style={{
                                fontFamily: "Poppins-Medium"
                            }}
                        >{errors.paymentProof}</Text>
                    }
                </View>

                <View className="w-full">
                    {/* Promo code section */}
                    <CustomInput
                        placeholder={GlbalLocale.promo_code}
                        value={promoCode}
                        setValue={setPromoCode}
                        name="promo"
                        keyboardType="default"
                        error={errors.promoCode}
                        classes="my-2"
                    />
                    {promo_verified &&
                        <Text
                            className="text-green-800 text-center"
                            style={{
                                fontFamily: "Poppins-SemiBold"
                            }}
                        >Promo Code Verified</Text>
                    }
                    <View>
                        <CustomButton
                            text={GlbalLocale.check_code}
                            onClick={checkPromoCode}
                            isLoading={isPromoLoading}
                        />
                    </View>
                </View>

                {/* Submit button */}
                <View className="">
                    <CustomButton
                        text={GlbalLocale.submit}
                        onClick={validateAndSubmit}
                        isLoading={isLoading}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => {
                        clearAndClose()
                    }}
                >
                    <Text
                        numberOfLines={1}
                        className={"text-center text-lg font-medium space-y-2 self-center text-red-500"}
                        style={{ fontSize: hp(2), fontFamily: "Poppins-Regular" }}
                    >
                        {GlbalLocale.dismiss_label}
                    </Text>
                </TouchableOpacity>

            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    my2: {
        marginVertical: 8,
    },
});

export default PaymentProofModal;
