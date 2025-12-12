import { memo, useCallback } from 'react';
import ProductCard from './ProductCard';

const ProductGrid = memo(({ products }) => {
    const handleAddToCart = useCallback(() => {}, []);
    return (
        <section className='w-full bg-white '>
            <div className='grid grid-cols-5 gap-1'>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
            </div>
        </section>
    );
});

export default ProductGrid;
