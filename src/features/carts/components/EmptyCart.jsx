import Button from '@components/ui/Button';
import emptyCartIcon from '@assets/images/emptyCartIcon.png';

const EmptyCart = ({ onNavigateHome }) => (
    <div className='max-w-full w-full flex flex-col items-center justify-center'>
        <div className='mt-12.5 mb-5'>
            <img src={emptyCartIcon} alt='' className='' />
        </div>

        <span className='text-sm text-foreground pt-10 py-4 '>Giỏ hàng chưa có sản phẩm</span>

        <Button
            variant='primary'
            children='Quay về trang chủ'
            className='px-5 font-light  '
            size='sm'
            onClick={onNavigateHome}
        />
        <div></div>
    </div>
);

export default EmptyCart;
