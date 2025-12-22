import { memo, useCallback, useState } from 'react';
import HeaderFilter from './HeaderFilter';

const BrandFilter = memo(({ title, items, className, onBrandClick, activeBrands = [] }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleBrandClick = useCallback(
        (brand) => {
            onBrandClick?.(brand);
        },
        [onBrandClick]
    );

    return (
        <div>
            <HeaderFilter title={title} expanded={isExpanded} onChange={setIsExpanded} />
            {isExpanded && (
                <div className={`mx-2.5 mb-2.5 grid gap-2.5 ${className}`}>
                    {Array.isArray(items) &&
                        items.map((brand, index) => (
                            <button
                                key={brand.id || index}
                                onClick={() => handleBrandClick(brand)}
                                type='button'
                                aria-label={`Lọc theo thương hiệu ${brand.name}`}
                                className={`cursor-pointer ${
                                    activeBrands.includes(brand.slug)
                                        ? 'border border-brand-primary'
                                        : ''
                                }`}
                            >
                                <div className='w-full h-full'>
                                    <img src={brand.logoUrl} alt={brand.name} loading='lazy' />
                                </div>
                            </button>
                        ))}
                </div>
            )}
        </div>
    );
});

BrandFilter.displayName = 'BrandFilter';

export default BrandFilter;
