import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../../../../components/ui/Button';

const AddToCartButton = ({ product, quantity, className }) => {
    // const queryClient = useQueryClient();

    // const { mutate: addToCart, isPending } = useMutation({
    //     mutationFn: async () => {
    //         // Gọi API thêm vào giỏ hàng
    //         const response = await fetch('/api/cart', {
    //             method: 'POST',
    //             body: JSON.stringify({ productId: product.id, quantity })
    //         });
    //         return response.json();
    //     },
    //     onSuccess: () => {
    //         // Invalidate và refetch cart data
    //         queryClient.invalidateQueries({ queryKey: ['cart'] });

    //         // Optional: Hiển thị toast thành công
    //         // toast.success('Đã thêm vào giỏ hàng');
    //     },
    //     onError: (error) => {
    //         // Optional: Hiển thị toast lỗi
    //         // toast.error('Không thể thêm vào giỏ hàng');
    //         console.error(error);
    //     }
    // });

    return (
        <Button
            className={`w-full rounded-none ${className ?? ''}`}
            // onClick={() => addToCart()}
            // disabled={isPending || !product.inStock}
        >
            Thêm vào giỏ hàng
        </Button>
    );
};

export default AddToCartButton;
