import axios from 'axios';
import Cookies from 'js-cookie';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_LINK || 'http://localhost:5000/admin',
    timeout: 10000,
    withCredentials: true

});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = Cookies.get("accesstoken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {

        if (response.data?.token) {
            Cookies.set("accesstoken", response.data?.token)
        }

        return response.data;
    },
    (error) => {
        // Handle common errors
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // Unauthorized - redirect to login
                    Cookies.remove("accesstoken");
                    // if (typeof (window) != "undefined") {
                    //     window.location.href = '/login';
                    // }

                    break;
                case 403:
                    Cookies.remove("accesstoken");
                    console.error('Access forbidden');
                    break;
                case 404:
                    console.error('Resource not found');
                    break;
                case 500:
                    console.error('Server error');
                    break;
                default:
                    console.error('An error occurred:', error.response.data);
            }
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;