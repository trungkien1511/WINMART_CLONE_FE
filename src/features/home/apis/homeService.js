// @services/homeService.js
import axiosClient from '../../../services/axiosClient';

const homeService = {
    getCategoriesSection: (limit) =>
        axiosClient.get('/home/categories-section', { params: { limit } }),

    getSectionProducts: (categoryId, offset, limit) =>
        axiosClient.get(`/home/categories-section/${categoryId}/products`, {
            params: { offset, limit }
        })
};

export default homeService;
