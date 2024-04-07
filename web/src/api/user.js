import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

// Add a request interceptor
axios.interceptors.request.use(
    (config) => {
        // Do something before sending the request
        // For example, add authorization headers
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

export const signIn = async (data) => {
    const res = await axios.post(apiUrl + '/api/user/signin', data);
    return res.data;
}

export const signUp = async (data) => {
    const res = await axios.post(apiUrl + '/api/user/signup', data);
    return res.data;
}

export const currentUser = async () => {
    const res = await axios.get(apiUrl + '/api/user');
    return res.data;
}