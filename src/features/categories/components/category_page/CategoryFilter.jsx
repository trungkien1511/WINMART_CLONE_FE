import { memo, useState } from 'react';
import Button from '@components/ui/Button';
import HeaderFilter from './HeaderFilter';

const CategoryFilter = memo(({ title, items, onItemClick, activeCat }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div>
            <HeaderFilter title={title} expanded={isExpanded} onChange={setIsExpanded} />
            {isExpanded && (
                <div className='mx-2.5 mb-2.5 grid grid-cols-1 gap-2.5 text-sm'>
                    {items?.map((cat) => (
                        <Button
                            key={cat.id}
                            variant={activeCat === cat.slug ? 'normal_active' : 'normal'}
                            onClick={() => onItemClick(cat)}
                        >
                            <span className='text-xs text-foreground font-light'>{cat.name}</span>
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
});

CategoryFilter.displayName = 'CategoryFilter';

export default CategoryFilter;
