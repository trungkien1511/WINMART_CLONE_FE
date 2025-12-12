import { ShoppingCart, User } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';

const CartCount = memo(({ count = 0 }) => <span className='font-semibold'>({count})</span>);

const ProfilePart = memo(({ userName = 'Hội viên' }) => (
    <Link
        to='/profile'
        aria-label={`Trang cá nhân${userName ? ` của ${userName}` : ''}`}
        className='flex items-center gap-2 hover:opacity-80 transition'
    >
        <User className='w-6 h-6' />
        <span>{userName}</span>
    </Link>
));

const CartPart = memo(({ cartCount = 0 }) => (
    <Link
        to='/cart'
        className='flex items-center gap-3 hover:opacity-80 transition font-semibold'
        aria-label={`Giỏ hàng có ${cartCount} sản phẩm`}
    >
        <ShoppingCart className='w-5 h-5' />
        <div className='flex flex-col items-center'>
            <span>Giỏ hàng</span>
            <CartCount count={cartCount} />
        </div>
    </Link>
));

const CartProfileGroup = memo(({ cartCount, userName }) => (
    <div className='flex items-center gap-4 text-xs text-white'>
        <CartPart cartCount={cartCount} />
        <ProfilePart userName={userName} />
    </div>
));

export default CartProfileGroup;
