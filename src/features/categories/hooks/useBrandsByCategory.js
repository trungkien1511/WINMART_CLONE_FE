import { useQuery } from '@tanstack/react-query';
import brandService from '@services/brandService';

/**
 * Hook để fetch brands theo category
 * @param {string} categorySlug - Category slug
 * @returns {UseQueryResult} Query result với brand list
 */
export const useBrandsByCategory = (categorySlug) => {
    return useQuery({
        queryKey: ['brands-by-category', categorySlug],
        queryFn: async () => {
            const res = await brandService.getBrandsByCat(categorySlug);
            return res.data;
        },
        enabled: !!categorySlug,
        suspense: true,
        staleTime: 1000 * 60 * 10 // ✅ Brands ít thay đổi, cache 10 phút
    });
};
