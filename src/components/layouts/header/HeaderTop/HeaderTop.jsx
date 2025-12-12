import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import homeLogo from '@assets/icons/whiteLogo.svg';
import SearchInput from './SearchInput';
import CartProfileGroup from './CartProfileGroup';

const HeaderTop = ({ onSearch, cartCount = 0, userName }) => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-wrap items-center justify-between max-w-6xl mx-auto py-4 gap-3 bg-brand-primary text-white'>
            <div className='flex items-center gap-3 flex-1 min-w-[300px] '>
                <img
                    src={homeLogo}
                    onClick={() => navigate('/')}
                    alt='WinMart Logo'
                    className='h-10 cursor-pointer transition-transform hover:scale-105'
                    decoding='async'
                />
                <div className='flex-1 flex justify-center'>
                    <SearchInput onSearch={onSearch} />
                </div>
            </div>

            <div className='flex justify-end flex-1'>
                <CartProfileGroup cartCount={cartCount} userName={userName} />
            </div>
        </div>
    );
};

HeaderTop.propTypes = {
    onSearch: PropTypes.func,
    cartCount: PropTypes.number,
    userName: PropTypes.string
};

export default HeaderTop;
