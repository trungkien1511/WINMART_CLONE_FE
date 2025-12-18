import { useQuery } from '@tanstack/react-query';
import productService from '../../../services/productService';

export const useProductsByCategory = (slug, options = {}) => {
    return useQuery({
        queryKey: ['products-by-category', slug],
        enabled: options.enabled ?? !!slug,
        queryFn: async () => {
            const res = await productService.getProductsByCategorySlug(slug);
            return res.data;
        },
        suspense: true
    });
};
