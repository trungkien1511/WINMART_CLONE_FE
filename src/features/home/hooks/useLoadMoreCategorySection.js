// src/features/home/hooks/useLoadMoreCategorySection.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import homeService from '../apis/homeService';
import { HOME_PAGE_SIZE, HOME_SECTIONS_QUERY_KEY } from '../constants';

export const useLoadMoreCategorySection = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({ categoryId, offset }) => {
            const res = await homeService.getSectionProducts(categoryId, offset, HOME_PAGE_SIZE);
            return { categoryId, data: res.data };
        },

        onSuccess: ({ categoryId, data }) => {
            queryClient.setQueryData(HOME_SECTIONS_QUERY_KEY, (old) => {
                if (!Array.isArray(old)) return old;

                return old.map((section) => {
                    if (section.id !== categoryId) return section;

                    return {
                        ...section,
                        products: [...section.products, ...data.products],
                        nextOffset: data.nextOffset
                    };
                });
            });
        }
    });

    const loadMore = (categoryId, nextOffset) => {
        if (nextOffset == null) return;
        if (mutation.isPending) return;
        mutation.mutate({ categoryId, offset: nextOffset });
    };

    return {
        loadMore,
        isLoadingMore: mutation.isPending,
        error: mutation.error,
        variables: mutation.variables // có thể dùng để biết đang load category nào
    };
};
