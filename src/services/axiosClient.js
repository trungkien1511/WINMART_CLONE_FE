import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000,
    withCredentials: true
});

axiosClient.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, config } = error.response;
            if (!(status === 401 && config.url?.includes('/auth/me'))) {
                console.error(`[API Error] ${status}:`, error.response.data);
            }
        } else if (error.request) {
            console.error('[Network Error] Server not responding');
        } else {
            console.error('[Config Error]', error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
