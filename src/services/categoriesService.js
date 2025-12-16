import axiosClient from './axiosClient';
const categoriesService = {
    getAll(config = {}) {
        return axiosClient.get('/category/tree', config);
    },
    getCategoriesChild(slug) {
        return axiosClient.get(`/category/${slug}`);
    }
};

export default categoriesService;
