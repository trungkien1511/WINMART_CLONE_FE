import { formatPrice } from '@features/products/utils/formatPrice.js';
import Button from '@components/ui/Button';

const OrderSummaryRow = ({
    label,
    value,
    highlight = false,
    bold = false,
    isOrderPage = false
}) => {
    const valueClassName = isOrderPage ? 'text-brand-primary' : 'text-xl text-brand-primary';

    return (
        <div className='flex items-center justify-between text-xs py-1.25'>
            <span className='text-foreground'>{label}:</span>
            <span
                className={`${bold ? 'font-bold' : 'font-light'} ${highlight ? valueClassName : 'text-foreground'}`}
            >
                {value ?? '0 đ'}
            </span>
        </div>
    );
};

const OrderSummary = ({ summary }) => (
    <section className='p-4 bg-white'>
        <div className='flex justify-end'>
            <div className='w-1/2  pl-15'>
                <div className='flex flex-col gap-1 text-sm'>
                    <OrderSummaryRow label='Tổng tiền hàng' value={formatPrice(summary.subtotal)} />
                    <OrderSummaryRow
                        label='Khuyến mãi'
                        value={`-${formatPrice(summary.discount)}`}
                    />
                    <OrderSummaryRow
                        label='Phí vận chuyển'
                        value={formatPrice(summary.shippingFee)}
                    />
                    <OrderSummaryRow
                        label='Tổng thanh toán'
                        value={formatPrice(summary.finalTotal)}
                        highlight
                    />
                </div>
                <div className='flex justify-end'>
                    <Button
                        variant='primary'
                        type='submit'
                        className='w-1/2 py-2 mt-4'
                        // disabled={isSubmitting}
                    >
                        Xác nhận đặt hàng
                    </Button>
                </div>
            </div>
        </div>
    </section>
);

export { OrderSummaryRow, OrderSummary };
