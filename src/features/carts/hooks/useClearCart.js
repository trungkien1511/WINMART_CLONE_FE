import { useMutation, useQueryClient } from '@tanstack/react-query';
import cartService from '../apis/cartService';
import { useSnackbar } from 'notistack';

export const useClearCart = () => {
    const qc = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: cartService.clearCart,

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['cart'] });
            enqueueSnackbar('Đã xóa toàn bộ giỏ hàng', { variant: 'success' });
        },

        onError: (e) => {
            console.error(e);
            enqueueSnackbar('Không thể xóa giỏ hàng', { variant: 'error' });
        }
    });
};
