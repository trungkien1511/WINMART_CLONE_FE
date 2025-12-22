import { memo } from 'react';

const HeaderFilter = memo(({ title, onChange, expanded }) => {
    return (
        <button
            className='w-full mt-2 px-2.5 py-1.75 flex justify-between items-center'
            onClick={() => onChange(!expanded)}
        >
            <span className='text-sm'>{title}</span>

            <ChevronRight
                className={`w-5 h-5 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
            />
        </button>
    );
});

HeaderFilter.displayName = 'HeaderFilter';

export default HeaderFilter;
