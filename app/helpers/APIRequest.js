import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuth, setIsAuthorized } from '../redux/AuthSlice';
import { store } from '../redux/store';
import Toast from 'react-native-toast-message';
export const MEDIA_BASE_URL = "https://dashboard.pakcardiocon.com";
export const BASE_PATH = 'https://pakcardiocon.com/'; // This is for webview base url
// const BASE_URL = 'https://pcsadmin.edylinn.com/api'; // Test server
const BASE_URL = 'https://dashboard.pakcardiocon.com/api'; // Live PCS server


const apiRequest = async (method, url, data = null, token = null) => {

    const headers = {};
    if (data instanceof FormData) {
        headers['Content-Type'] = 'multipart/form-data'
    }
    else {
        headers['Content-Type'] = 'application/json'
    }
    const token_data = await AsyncStorage.getItem('token');
    if (token_data) {
        headers['Authorization'] = `Bearer ${token_data}`;
    }
    try {
        const response = await axios.request({
            method,
            maxBodyLength: Infinity,
            url: `${BASE_URL}/${url}`,
            headers,
            transformRequest: (data, headers) => {
                return data; // This chunk was written to make API functional on iOS becuase form data was not working withour this
            },
            data: data ? data instanceof FormData ? data : JSON.stringify(data) : null,
        });
        return response.data;
    } catch (error) {
        // console.error('Error in API request:', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Response data:', error.response?.data);
            console.error('Response status:', error.response?.status);
            console.error('Response headers:', error.response?.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an error
            console.error('Error setting up request:', error.message);
        }

        if (error.response && error.response.status === 401) {
            // Clear token from AsyncStorage
            await AsyncStorage.removeItem('token');
            // Redirect user to login page
            // redirectToLogin();
            Toast.show({
                type: 'error',
                text1: 'Unauthenticated',
                text2: "Session Expired. Please login and try again!"
            });
            store.dispatch(setAuth({}));
            store.dispatch(setIsAuthorized(false));
        }
        throw error;
    }
};

export const postRequest = async (url, data, token) => {
    return await apiRequest('post', url, data, token);
};

export const getRequest = async (url, token) => {
    return await apiRequest('get', url, null, token);
};

export const putRequest = async (url, data, token) => {
    return await apiRequest('put', url, data, token);
};

export const deleteRequest = async (url, token) => {
    return await apiRequest('delete', url, null, token);
};
