import axiosClient from './axiosClient';

const authService = {
    login: (phoneNumber, password) =>
        axiosClient.post('/auth/login', { username: phoneNumber, password }),
    register: (data) => axiosClient.post('/auth/register', data)
};

export default authService;
