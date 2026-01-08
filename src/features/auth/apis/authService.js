import axiosClient from '../../../services/axiosClient';

const authService = {
    login: (phoneNumber, password) =>
        axiosClient.post('/auth/login', {
            phoneNumber,
            password
        }),

    logout: () => axiosClient.post('/auth/logout'),

    me: () => axiosClient.get('/auth/me'),

    register: (data) => axiosClient.post('/auth/register', data)
};

export default authService;
