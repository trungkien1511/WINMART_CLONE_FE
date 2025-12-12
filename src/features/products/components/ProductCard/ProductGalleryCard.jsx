import { memo } from 'react';
import product_temp from '@/assets/images/product_temp.png';

const ProductGalleryCard = memo(({ src, alt }) => {
    return (
        <div className='relative w-full h-[190px] overflow-hidden flex justify-center'>
            <img
                src={product_temp}
                alt={alt}
                className='w-full h-full object-cover'
                loading='lazy'
                draggable={false}
            />
        </div>
    );
});

export default ProductGalleryCard;
