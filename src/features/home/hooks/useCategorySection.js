import { useQuery } from '@tanstack/react-query';
import homeService from '@services/homeService';

export const useCategorySection = () => {
    return useQuery({
        queryFn: async () => {
            const res = await homeService.getCategoriesSection();
            return res.data;
        },
        suspense: true
    });
};
