// src/features/home/hooks/useCategorySection.js
import { useQuery } from '@tanstack/react-query';
import homeService from '../apis/homeService';
import { HOME_PAGE_SIZE, HOME_SECTIONS_QUERY_KEY } from '../constants';

export const useCategorySection = () => {
    return useQuery({
        queryKey: HOME_SECTIONS_QUERY_KEY,
        queryFn: async () => {
            const res = await homeService.getCategoriesSection(HOME_PAGE_SIZE);
            return res.data;
        },
        suspense: true
    });
};
