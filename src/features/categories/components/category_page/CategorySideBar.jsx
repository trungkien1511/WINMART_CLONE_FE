import { memo } from 'react';
import CategoryFilter from './CategoryFilter';
import BrandFilter from './BrandFilter';

const CategorySidebar = memo(
    ({ categories, brands, onCatClick, onBrandClick, activeBrands, activeCat }) => {
        return (
            <div className='flex flex-col flex-1 border-r border-divider'>
                <CategoryFilter
                    title={categories.name}
                    items={categories.children}
                    onItemClick={onCatClick}
                    activeCat={activeCat}
                />
                <hr className='border-divider' />
                <BrandFilter
                    title='Thương hiệu'
                    items={brands}
                    className='grid-cols-2'
                    onBrandClick={onBrandClick}
                    activeBrands={activeBrands}
                />
            </div>
        );
    }
);

CategorySidebar.displayName = 'CategorySidebar';

export default CategorySidebar;
