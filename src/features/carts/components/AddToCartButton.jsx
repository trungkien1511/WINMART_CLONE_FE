import Button from '@components/ui/Button';
import { useAddToCart } from '../hooks/useAddToCart';

const AddToCartButton = ({ inStock, quantity = 1, product, className }) => {
    const addToCartMutation = useAddToCart();
    const productPackagingId = product.productPackagingId ?? product.packagingId ?? product.id;

    return (
        <Button
            className={`w-full rounded-none ${className ?? ''}`}
            onClick={() => addToCartMutation.mutate({ productPackagingId, quantity })}
            disabled={!inStock}
        >
            Thêm vào giỏ hàng
        </Button>
    );
};

export default AddToCartButton;
