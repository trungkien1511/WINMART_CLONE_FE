import { Mail, Headphones } from 'lucide-react';
import { memo } from 'react';
import NavLink from './NavLink';
import CategoryMenu from './CategoryMenu/CategoryMenu';

const HeaderBottom = () => {
    return (
        <nav className='bg-background-neutral text-black border-b border-divider'>
            <div className='flex flex-wrap items-center justify-between max-w-6xl mx-auto'>
                <CategoryMenu />
                <div className='flex items-center gap-2'>
                    <NavLink icon={Mail} label='Tin tức WinMart' to='/news' />
                    <NavLink icon={Headphones} label='Tư vấn mua hàng' to='/support' />
                </div>
            </div>
        </nav>
    );
};

export default memo(HeaderBottom);
