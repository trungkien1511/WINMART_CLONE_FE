import { useState } from 'react';
import Button from '../../../components/ui/Button';

// AddToCartButton.jsx
const AddToCartButton = ({ product, quantity, className }) => {
    const [loading, setLoading] = useState(false);

    const handleAddToCart = async () => {
        try {
            setLoading(true);
            // gọi API / context addToCart(product, quantity)
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            className={`w-full rounded-none ${className ?? ''}`}
            onClick={handleAddToCart}
            // disabled={loading || !product.inStock}
        >
            {loading ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
        </Button>
    );
};

export default AddToCartButton;
