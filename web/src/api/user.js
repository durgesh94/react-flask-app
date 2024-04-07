import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const login = async (data) => {
    const res = await axios.post(apiUrl + '/api/user/signin', data);
    return res.data;
}

export const signUp = async (data) => {
    const res = await axios.post('', data);
    return res.data;
}