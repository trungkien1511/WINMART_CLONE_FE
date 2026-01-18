import { ShoppingCart, User, LogOut } from 'lucide-react';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@app/auth/useAuth';
import { useCart } from '@features/carts/hooks/useCart';

const CartCount = memo(({ count = 0 }) => <span className='font-semibold'>({count})</span>);

const MenuProfile = memo(({ menu_items }) => {
    return (
        <div className='absolute left-0 top-full pt-2  hidden group-hover:block z-50'>
            <div className='w-50 bg-white shadow'>
                {menu_items &&
                    menu_items.map((items) => {
                        const Icon = items.icon;
                        return (
                            <button
                                className='w-full pl-2 py-2 flex items-center h-10 gap-2 cursor-pointer text-xs text-foreground hover:text-brand-primary hover:bg-neutral-200'
                                key={items.id}
                                onClick={items.onclick}
                            >
                                <Icon className='w-4 h-4' />
                                <span>{items.label}</span>
                            </button>
                        );
                    })}
            </div>
        </div>
    );
});

const ProfilePart = () => {
    const navigate = useNavigate();

    const menu_items = [
        {
            id: 1,
            icon: User,
            label: 'Tài khoản',
            onclick: () => navigate('/customer/profile')
        },
        {
            id: 2,
            icon: LogOut,
            label: 'Đăng xuất',
            onclick: () => logout()
        }
    ];
    const { status, user, logout } = useAuth();

    // Guest
    if (status === 'guest') {
        return (
            <Link
                to='/login'
                className='flex items-center gap-2 hover:opacity-80 transition'
                aria-label='Đăng nhập'
            >
                <User className='w-6 h-6' />
                <span>Hội viên</span>
            </Link>
        );
    }

    // Authenticated
    return (
        <div className='relative group inline-flex flex-col '>
            <Link
                to='/profile'
                className='flex items-center gap-2 hover:opacity-80 transition'
                aria-label={`Trang cá nhân của ${user?.phone ?? ''}`}
            >
                <User className='w-6 h-6' />
                <span>{user?.fullName}</span>
            </Link>
            <MenuProfile menu_items={menu_items} />
        </div>
    );
};

const CartPart = memo(() => {
    const { data: cart } = useCart();
    const cartCount = cart?.items?.reduce((s, it) => s + (it.quantity ?? 0), 0) ?? 0;

    return (
        <Link
            to='/cart'
            className='flex items-center gap-3 hover:opacity-80 transition font-semibold'
        >
            <ShoppingCart className='w-5 h-5' />
            <div className='flex flex-col items-center'>
                <span>Giỏ hàng</span>
                <CartCount count={cartCount} />
            </div>
        </Link>
    );
});

const CartProfileGroup = () => {
    return (
        <div className=' flex items-center gap-4 text-xs text-white'>
            <CartPart />
            <ProfilePart />
        </div>
    );
};

export default CartProfileGroup;
