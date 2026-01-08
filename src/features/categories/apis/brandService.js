import axiosClient from '../../../services/axiosClient';
const brandService = {
    getBrandsByCat(slug) {
        return axiosClient.get(`/brand/by-category/${slug}`);
    }
};

export default brandService;
