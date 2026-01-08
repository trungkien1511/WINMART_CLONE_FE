import { useMutation, useQueryClient } from '@tanstack/react-query';
import cartService from '../apis/cartService';
import { useSnackbar } from 'notistack';

export const useAddToCart = () => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: ({ productPackagingId, quantity }) =>
            cartService.addItem({ productPackagingId, quantity }),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            enqueueSnackbar('Đã thêm vào giỏ hàng', { variant: 'success' });
        },

        onError: (error) => {
            console.error(error);
            enqueueSnackbar('Không thể thêm vào giỏ hàng', { variant: 'error' });
        }
    });
};
