import axios from './axiosClient';

const productService = {
    getProductDetail(slug, config = {}) {
        return axios.get(`/product/${slug}`, config);
    }
};

export default productService;
