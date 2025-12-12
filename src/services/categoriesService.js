import axiosClient from './axiosClient';
const categoriesService = {
    getAll(config = {}) {
        return axiosClient.get('/categories/tree', config);
    }
};

export default categoriesService;
