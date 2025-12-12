import { memo } from 'react';

const ProductInfo = memo(({ name, category }) => {
    return (
        <div>
            <div className='mb-8 text-xs'>
                <h6 className='text-foreground '>{name}</h6>
                <div className='opacity-50'>{category}</div>
            </div>
        </div>
    );
});

export default ProductInfo;
