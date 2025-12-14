import { memo, useCallback } from 'react';
import ProductCard from './ProductCard';

const ProductGrid = memo(({ products, className }) => {
    const handleAddToCart = useCallback(() => {}, []);
    return (
        <section className='w-full bg-white '>
            <div className={`grid  gap-1 ${className}`}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
            </div>
        </section>
    );
});

export default ProductGrid;
