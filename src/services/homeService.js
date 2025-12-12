import axiosClient from './axiosClient';

const homeService = {
    getCategoriesSection(config = {}) {
        return axiosClient.get('/home/categories-section', config);
    }
};

export default homeService;
