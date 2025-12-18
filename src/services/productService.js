import axiosClient from './axiosClient';

const productService = {
    getProductDetail(slug, config = {}) {
        return axiosClient.get(`/product/${slug}`, config);
    },
    getProductsByCategorySlug(parentSlug, childSlug, config = {}) {
        const url = childSlug
            ? `/category/${parentSlug}/${childSlug}/products`
            : `/category/${parentSlug}/products`;

        return axiosClient.get(url, config);
    }
};

export default productService;
