import axios from 'axios';

const BASE_URL = 'https://pcsadmin.edylinn.com/api';

const apiRequest = async (method, url, data = null, token = null) => {
    const headers = {};
    if (data instanceof FormData) {
        headers['Content-Type'] = 'multipart/form-data'
    }
    else {
        headers['Content-Type'] = 'application/json'
    }
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    try {
        const response = await axios.request({
            method,
            url: `${BASE_URL}/${url}`,
            headers,
            data: data ? data instanceof FormData ? data : JSON.stringify(data) : null,
        });
        return response.data;
    } catch (error) {
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
