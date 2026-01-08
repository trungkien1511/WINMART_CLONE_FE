import { useMutation, useQueryClient } from '@tanstack/react-query';
import cartService from '../apis/cartService';
import { useSnackbar } from 'notistack';

export const useRemoveCartItem = () => {
    const qc = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: cartService.deleteItem,

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['cart'] });
        },

        onError: (e) => {
            console.error(e);
            enqueueSnackbar('Không thể xóa sản phẩm', { variant: 'error' });
        }
    });
};
