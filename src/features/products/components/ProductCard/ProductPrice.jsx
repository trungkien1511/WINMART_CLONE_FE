import { memo } from 'react';
import { formatPrice } from '../../utils/formatPrice';

const ProductPrice = memo(({ originalPrice, salePrice, isOnSale }) => (
    <div className='flex items-center gap-1'>
        <data className='text-base text-brand-primary font-bold'>{formatPrice(salePrice)}</data>
        {isOnSale && originalPrice && (
            <del className='text-xxs opacity-50'>{formatPrice(originalPrice)}</del>
        )}
    </div>
));

export default ProductPrice;
