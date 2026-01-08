import { useQuery } from '@tanstack/react-query';
import checkoutService from '../apis/checkoutService';

export const useGetCheckout = () => {
    return useQuery({
        queryKey: ['checkout', 'summary'],
        queryFn: async () => {
            const res = await checkoutService.summaryCheckout();

            return res.data;
        },
        staleTime: 30 * 1000, // 30s
        refetchOnWindowFocus: false, // tránh đổi giá khi quay tab
        retry: false
    });
};
