import { useQuery } from '@tanstack/react-query';
import productService from '../apis/productService';

export const useProductDetail = (slug) => {
    return useQuery({
        queryKey: ['product', slug], // Cache key
        queryFn: async () => {
            const res = await productService.getProductDetail(slug);
            return res.data;
        },
        enabled: !!slug
    });
};
