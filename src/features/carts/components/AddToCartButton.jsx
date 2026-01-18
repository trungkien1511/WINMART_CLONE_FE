import Button from '@components/ui/Button';
import { useAddToCart } from '../hooks/useAddToCart';

const AddToCartButton = ({ inStock, quantity = 1, product, className }) => {
    const addToCartMutation = useAddToCart();
    const productPackagingId = product.productPackagingId ?? product.packagingId ?? product.id;

    return (
        <Button
            variant='primary_1'
            onClick={() => addToCartMutation.mutate({ productPackagingId, quantity })}
            disabled={!inStock}
            className='w-full'
        >
            THÊM VÀO GIỎ
        </Button>
    );
};

export default AddToCartButton;
