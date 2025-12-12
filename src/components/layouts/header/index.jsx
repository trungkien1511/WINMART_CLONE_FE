import HeaderTop from './HeaderTop/HeaderTop';
import HeaderBottom from './HeaderBottom/HeaderBottom';

const Header = () => {
    return (
        <header className='sticky top-0 z-50 shadow bg-brand-primary'>
            <HeaderTop />
            <HeaderBottom />
        </header>
    );
};

export default Header;
