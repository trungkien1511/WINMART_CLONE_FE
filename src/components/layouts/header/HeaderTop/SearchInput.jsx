import { memo, useEffect, useRef, useState } from 'react';
import useDebounce from '@hooks/useDebounce';
import { Search } from 'lucide-react';

const SearchInput = memo(({ onSearch }) => {
    const CONSTANTS = {
        SEARCH_DEBOUNCE_MS: 500,
        SEARCH_MAX_LENGTH: 100
    };

    const [searchValue, setSearchValue] = useState('');
    const debouncedSearch = useDebounce(searchValue, CONSTANTS.SEARCH_DEBOUNCE_MS);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        onSearch?.(debouncedSearch);
    }, [debouncedSearch, onSearch]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') onSearch?.(searchValue);
        if (e.key === 'Escape') setSearchValue('');
    };

    return (
        <div className='flex flex-1 items-center gap-2 bg-white border border-gray-300 rounded-full px-3 py-2 shadow-sm '>
            <Search className='w-4 h-4 text-gray-500' />
            <input
                type='text'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Tìm kiếm sản phẩm...'
                maxLength={CONSTANTS.SEARCH_MAX_LENGTH}
                className='flex-1 text-xxs text-gray-800 focus:outline-none'
            />
        </div>
    );
});

export default SearchInput;
