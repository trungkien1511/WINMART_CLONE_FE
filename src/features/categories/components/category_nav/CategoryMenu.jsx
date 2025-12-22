import { memo } from 'react';
import { Menu as MenuIcon } from 'lucide-react';

import CategoryItem from './CategoryItem';
import SubMenu from './SubMenu';
import { useCategoryMenu } from '../../hooks/useCategoryMenu';

const CategoryMenu = () => {
    const {
        isOpen,
        isOpenSubMenu,
        categories,
        hoveredCategory,
        handleMenuEnter,
        handleMenuLeave,
        handleMouseEnterCategory,
        handleMouseLeaveCategory,
        handleClickCategory
    } = useCategoryMenu();
    return (
        <div className='relative' onMouseEnter={handleMenuEnter} onMouseLeave={handleMenuLeave}>
            <button type='button' className='flex items-center gap-2 text-xs text-black pb-2 mt-3'>
                <MenuIcon className='w-4 h-4' />
                Danh mục sản phẩm
            </button>

            {isOpen && (
                <>
                    <div className='fixed inset-0 bg-black/50 z-40' />

                    <div
                        className='absolute left-0 top-0 z-50 flex w-6xl  max-h-[90vh]'
                        onMouseLeave={() => handleMenuLeave()}
                    >
                        <div className='bg-white basis-1/6'>
                            {categories.map((category) => (
                                <CategoryItem
                                    key={category.id}
                                    category={category}
                                    onMouseEnter={() => handleMouseEnterCategory(category)}
                                    onMouseLeave={() => handleMouseLeaveCategory(category)}
                                    onClick={() => handleClickCategory(category)}
                                />
                            ))}
                        </div>

                        {isOpenSubMenu && (
                            <SubMenu category={hoveredCategory} onClick={handleClickCategory} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default memo(CategoryMenu);
