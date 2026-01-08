import { formatPrice } from '@features/products/utils/formatPrice.js';
import Button from '@components/ui/Button';

const OrderSummaryRow = ({ label, value, highlight = false }) => {
    return (
        <div className='flex items-center justify-between text-sm'>
            <span className='text-foreground'>{label}:</span>
            <span className={highlight ? 'text-xl text-brand-primary' : 'text-muted-foreground'}>
                {value ?? '—'}
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
                <div className='w-full flex justify-end'>
                    <Button
                        variant='primary'
                        type='submit'
                        className='max-w-1/2 w-full py-2 mt-4'
                        // disabled={isSubmitting}
                    >
                        Xác nhận đặt hàng
                    </Button>
                </div>
            </div>
        </div>
    </section>
);

export default OrderSummary;
