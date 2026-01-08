import { useMutation, useQueryClient } from '@tanstack/react-query';
import cartService from '../apis/cartService';

export const useUpdateCartItemQuantity = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ cartItemId, quantity }) =>
            cartService.updateItemQty({ cartItemId, quantity }),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['cart'] });
        }
    });
};
