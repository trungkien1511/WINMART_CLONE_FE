import { memo, useCallback } from 'react';
import Button from '@components/ui/Button';
import { Link } from 'react-router-dom';
import ProductGalleryCard from './ProductGalleryCard';
import ProductInfo from '@features/products/components/ProductCard/ProductInfo';
import ProductPrice from '@features/products/components/ProductCard/ProductPrice';
import { ShoppingCart } from 'lucide-react';

const ProductCard = memo(({ product, onAddToCart }) => {
    const handleAddToCart = useCallback(() => {}, []);

    return (
        <article className='flex flex-col justify-between border border-gray-100 hover:border-brand-primary cursor-pointer shadow-full rounded-xl p-3'>
            <Link to={`/products/${product.slug}`} className='block'>
                <ProductGalleryCard src={product.image} alt={product.name} />
                <ProductInfo name={product.name} category={product.packagingType} />
            </Link>
            <div className='space-y-2'>
                <ProductPrice
                    originalPrice={product.originalPrice}
                    salePrice={product.finalPrice}
                    isOnSale={product.onSale}
                />
                <Button
                    onClick={handleAddToCart}
                    variant='secondary'
                    startIcon={<ShoppingCart size={16} />}
                    children='Thêm giỏ hàng'
                    className='w-full'
                />
            </div>
        </article>
    );
});

export default ProductCard;
