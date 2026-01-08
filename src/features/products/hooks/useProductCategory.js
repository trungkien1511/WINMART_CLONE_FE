import { useQuery } from '@tanstack/react-query';
import productService from '../apis/productService';

export const useProductsByCategory = ({ activeSlug, params }) => {
    const brandsKey = params.brands?.join(',') || '';

    return useQuery({
        queryKey: ['products', activeSlug, params.order || '', brandsKey],
        enabled: !!activeSlug,
        queryFn: async () => {
            const res = await productService.getProductsByCategorySlug(activeSlug, {
                ...(params.order && { order: params.order }),
                ...(brandsKey && { brands: brandsKey }) // ✅ Check brandsKey thay vì params.brands.length
            });
            return res.data;
        },
        suspense: true
    });
};
