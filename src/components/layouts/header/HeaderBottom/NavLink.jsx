// ===============================================
// NAV LINK

import { memo } from 'react';
import { Link } from 'react-router-dom';

// ===============================================
const NavLink = memo(({ icon: Icon, label, to }) => (
    <Link
        to={to}
        className='flex items-center gap-1 text-xxs px-2.5 py-2.5 hover:text-primary transition'
    >
        <Icon className='w-4 h-4' />
        {label}
    </Link>
));

export default NavLink;
