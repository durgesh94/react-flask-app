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

export const getAllBlogs = async () => {
    const res = await axios.get(apiUrl + '/api/blogpost');
    return res.data;
}

export const getPostByUser = async (id) => {
    const res = await axios.get(apiUrl + `/api/user/${id}/blogpost`);
    return res.data;
}