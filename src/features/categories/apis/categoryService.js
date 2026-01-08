import axiosClient from '@services/axiosClient';

const categoryService = {
    getAll(config = {}) {
        return axiosClient.get('/category/tree', config);
    },
    getCategoriesTree(slug) {
        return axiosClient.get(`/category/${slug}`);
    }
};

export default categoryService;
