import { Linking, Platform } from 'react-native';

const openPhoneNumber = async (phoneNumber) => {
    const formattedPhoneNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digits
    // const phoneUrl = `tel:+${formattedPhoneNumber}`;
    const phoneUrl = `tel:${formattedPhoneNumber}`;
    Linking.openURL(phoneUrl);
};

const openEmailAddress = async (emailAddress) => {
    const emailUrl = `mailto:${emailAddress}`;
    try {
        const canOpen = await Linking.canOpenURL(emailUrl);
        if (canOpen) {
            await Linking.openURL(emailUrl);
        } else {
            console.warn('Cannot open email address');
        }
    } catch (error) {
        console.error('Error opening email address:', error);
    }
};

const openUrl = (url) => {
    Linking.openURL(url);
};

const HandleAction = (actionType, data) => {
    switch (actionType) {
        case 'phone':
            openPhoneNumber(data);
            break;
        case 'email':
            openEmailAddress(data);
            break;
        case 'website':
            openUrl(data);
            break;
        default:
            console.warn('Unsupported action type:', actionType);
    }
};

export default HandleAction;
