import { useQuery } from '@tanstack/react-query';
import categoryService from '../../../services/categoryService';

export const useCategoriesTree = (slug) => {
    return useQuery({
        queryKey: ['category-tree', slug],
        queryFn: async () => {
            const res = await categoryService.getCategoriesTree(slug);
            return res.data;
        },
        enabled: !!slug,
        suspense: true
    });
};
