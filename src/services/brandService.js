import axiosClient from './axiosClient';
const brandService = {
    getBrandsByCat(slug) {
        return axiosClient.get(`/brand/by-category/${slug}`);
    }
};

export default brandService;
