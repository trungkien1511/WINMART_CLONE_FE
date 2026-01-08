import { formatPrice } from '@features/products/utils/formatPrice.js';
import { Link, useNavigate } from 'react-router-dom';
import { Ticket } from 'lucide-react';
import Button from '@components/ui/Button';

const FREE_SHIPPING_THRESHOLD = 200000;
const SHIPPING_FEE = 0;

const SummaryRow = ({ label, value }) => (
    <div className='flex justify-between items-center text-foreground text-xs'>
        <span>{label}</span>
        <span>{value}</span>
    </div>
);

const CartSummary = ({ summary }) => {
    const navigate = useNavigate();
    const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - summary.finalAmount);

    return (
        <aside className='max-w-[33%] w-full px-4'>
            <div className='space-y-2'>
                <SummaryRow label='Tạm tính giỏ hàng' value={formatPrice(summary.subtotal)} />
                <SummaryRow label='Tạm tính sản phẩm KM' value={formatPrice(0)} />
                <SummaryRow
                    label='Tiết kiệm được'
                    value={`-${formatPrice(summary.discountTotal)}`}
                />
                <SummaryRow label='Phí vận chuyển' value={formatPrice(SHIPPING_FEE)} />
                <SummaryRow label='Khuyến mại' value={formatPrice(0)} />
                <SummaryRow label='Thành tiền' value={formatPrice(summary.finalTotal)} />

                <p className='text-xs italic text-muted-foreground'>(Đã bao gồm VAT)</p>

                {remainingForFreeShip > 0 && (
                    <p className='text-xs text-foreground'>
                        <Link to='/' className='text-brand-primary hover:underline'>
                            Mua thêm
                        </Link>{' '}
                        để miễn phí giao hàng từ{' '}
                        <strong>{formatPrice(FREE_SHIPPING_THRESHOLD)}</strong>
                    </p>
                )}

                <div className='flex flex-col gap-2'>
                    <Button startIcon={<Ticket />} className='font-light text-xs'>
                        Mã giảm giá
                    </Button>

                    <Button
                        className='py-5'
                        onClick={() => {
                            navigate('/checkout');
                        }}
                    >
                        <div className='flex flex-col text-xs font-bold'>
                            <span>THANH TOÁN</span>
                            <span>{formatPrice(summary.finalTotal)}</span>
                        </div>
                    </Button>
                </div>
            </div>
        </aside>
    );
};

export default CartSummary;
