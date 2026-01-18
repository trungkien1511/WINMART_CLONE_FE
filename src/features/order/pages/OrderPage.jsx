import { CircleCheck } from 'lucide-react';
import product_temp from '@assets/images/product_temp.png';
import { OrderSummaryRow } from '../../checkout/components/OrderSummary';
import { formatPrice } from '@features/products/utils/formatPrice.js';
import { useQuery } from '@tanstack/react-query';
import orderService from '../apis/orderService';
import Button from '@components/ui/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const OrderPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderCode = location.state?.orderCode;

    useEffect(() => {
        const allow = sessionStorage.getItem('ALLOW_ORDER_SUCCESS');

        if (allow !== '1' || !orderCode) {
            navigate('/', { replace: true });
            return;
        }

        const t = setTimeout(() => {
            sessionStorage.removeItem('ALLOW_ORDER_SUCCESS');
        }, 300);

        return () => clearTimeout(t);
    }, [orderCode, navigate]);

    const { data: order } = useQuery({
        queryKey: ['order', orderCode],
        enabled: !!orderCode,
        queryFn: async () => {
            const res = await orderService.getDetail(orderCode);
            return res.data;
        }
    });

    const items = order?.items;
    const summary = order?.summary;

    return (
        <div className='bg-white pt-8'>
            <div className='flex'>
                <div className='flex-2 p-4'>
                    <div className='flex items-center justify-center gap-1 mb-5'>
                        <CircleCheck size={30} strokeWidth={1.5} color='white' fill='#228b22' />
                        <span className='text-[#228b22] text-[26px]'>ĐẶT HÀNG THÀNH CÔNG</span>
                    </div>
                    <p className='text-foreground text-xs my-1.25'>
                        Cảm ơn quý khách đã đặt hàng tại WinMart!
                    </p>
                    <p className='text-foreground text-xs my-1.25'>
                        Đơn hàng {order?.orderCode} đã được tạo thành công. Nếu Quý khách có yêu cầu
                        đặc biệt, vui lòng liên hệ nhân viên tư vấn tại hotline 02471066866
                    </p>
                    <div className='mt-5 p-5 border border-divider bg-[#e6e3e2]'>
                        <div className='space-y-2 text-xs'>
                            <div className='flex gap-5 items-center'>
                                <span>Họ và tên người đặt:</span>
                                <span>abc</span>
                            </div>
                            <div className='flex gap-5 items-center'>
                                <span>Số điện thoại chính chủ:</span>
                                <span>abc</span>
                            </div>
                            <div className='flex gap-5 items-center'>
                                <span>Họ tên người nhận:</span>
                                <span>{order?.receiverName}</span>
                            </div>
                            <div className='flex gap-5 items-center'>
                                <span>Số điện thoại người nhận:</span>
                                <span>{order?.receiverPhone}</span>
                            </div>
                            <div className='flex gap-5 items-center'>
                                <span>Địa chỉ nhận hàng:</span>
                                <span>{order?.receiverAddress}</span>
                            </div>
                            <div className='flex gap-5 items-center'>
                                <span>Phương Thức thanh toán:</span>
                                <span>
                                    {order?.paymentMethod == 'COD' ? 'Tiền mặt' : 'Chuyển khoản'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 flex justify-end'>
                        <Button
                            size='lg'
                            className='font-light px-3 rounded-none'
                            onClick={() => navigate('/')}
                        >
                            Tiếp tục mua hàng
                        </Button>
                    </div>
                </div>
                <div className='flex-1 p-4'>
                    <div className='font-bold text-lg text-center mt-2.5 mb-5'>SẢN PHẨM ĐÃ MUA</div>
                    <div className='border border-[#d5d6d6]'>
                        {items &&
                            items.map((item) => {
                                return (
                                    <div
                                        className='flex px-1.25 py-2.5 border-b border-[#d5d6d6]'
                                        key={item.id}
                                    >
                                        <div className='max-w-25 w-full max-h-25'>
                                            <img
                                                src={product_temp}
                                                alt=''
                                                draggable='false'
                                                className='w-full h-full object-cover'
                                            />
                                        </div>

                                        <div className='text-xs flex flex-col justify-evenly text-foreground'>
                                            <span>{item.name}</span>
                                            <div className='flex space-x-1'>
                                                <span>{formatPrice(item.finalPrice)}</span>
                                                <span>x</span>
                                                <span>{item.quantity}</span>
                                                <span>=</span>
                                                <span>{formatPrice(item.lineTotal)}</span>
                                            </div>
                                        </div>
                                        <hr className='border border-[#d5d6d6]' />
                                    </div>
                                );
                            })}
                        <div className='px-5 pt-1.5 pb-2.5'>
                            <OrderSummaryRow
                                label='Tạm tính'
                                value={formatPrice(summary?.subtotal)}
                                bold
                            />
                            <OrderSummaryRow
                                label='Phí vận chuyển'
                                value={formatPrice(summary?.shippingFee)}
                            />
                            <OrderSummaryRow
                                label='Khuyến mại'
                                value={formatPrice(summary?.discountTotal)}
                            />
                            <OrderSummaryRow
                                label='Thành tiền'
                                value={formatPrice(summary?.finalTotal)}
                                bold
                                highlight={true}
                                isOrderPage={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
