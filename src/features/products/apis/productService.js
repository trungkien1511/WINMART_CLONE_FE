import axiosClient from '../../../services/axiosClient';

const productService = {
    getProductDetail(slug) {
        return axiosClient.get(`/product/${slug}`);
    },
    getProductsByCategorySlug(slug, params = {}) {
        return axiosClient.get(`/category/${slug}/products`, {
            params
        });
    }
};

export default productService;
