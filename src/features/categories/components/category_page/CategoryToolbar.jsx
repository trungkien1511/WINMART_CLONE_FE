import { memo } from 'react';
import Button from '@components/ui/Button';

const CategoryToolbar = memo(({ sortOptions, onOrderClick, activeOrder }) => {
    return (
        <div className='flex gap-2 mt-2.5 ml-2.5'>
            {sortOptions.map((option) => (
                <Button
                    key={option.value}
                    variant={activeOrder === option.value ? 'normal_active' : 'normal'}
                    onClick={() => onOrderClick(option.value)}
                >
                    {option.label}
                </Button>
            ))}
        </div>
    );
});

CategoryToolbar.displayName = 'CategoryToolbar';

export default CategoryToolbar;
