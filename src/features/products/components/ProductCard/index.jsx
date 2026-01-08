import { memo, useCallback } from 'react';
import Button from '@components/ui/Button';
import { Link } from 'react-router-dom';
import ProductGalleryCard from './ProductGalleryCard';
import ProductInfo from '@features/products/components/ProductCard/ProductInfo';
import ProductPrice from '@features/products/components/ProductCard/ProductPrice';
import { ShoppingCart } from 'lucide-react';
import { useAddToCart } from '../../../carts/hooks/useAddToCart';

const ProductCard = memo(({ product }) => {
    const addToCartMutation = useAddToCart();
    const productPackagingId = product.productPackagingId ?? product.packagingId ?? product.id;
    const quantity = 1;
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
                    onClick={() => addToCartMutation.mutate({ productPackagingId, quantity })}
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
