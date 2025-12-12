import { ChevronRight } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';

// Memoized CategoryItem component - tránh re-render không cần thiết
const CategoryItem = memo(({ category, onMouseEnter, onMouseLeave }) => {
    const hasChildren = category.children?.length > 0;

    return (
        <Link
            to={`category/${category.slug}`}
            className='flex justify-between w-full px-2 py-1 text-xs text-textPrimary font-bold hover:bg-brand-primary hover:text-white'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {category.name}
            {hasChildren && <ChevronRight className='w-4 h-4' />}
        </Link>
    );
});

CategoryItem.displayName = 'CategoryItem';

export default CategoryItem;
