import { useQuery } from '@tanstack/react-query';
import cartService from '../apis/cartService';

export const useCart = () => {
    return useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const res = await cartService.getCart();
            return res.data;
        },
        placeholderData: (prev) => prev
    });
};
