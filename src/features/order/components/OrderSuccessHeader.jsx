// components/OrderSuccessHeader.jsx
import { CircleCheck } from 'lucide-react';

const OrderSuccessHeader = ({ orderCode, hotline }) => (
    <div>
        <div className='flex items-center justify-center gap-2 mb-6'>
            <CircleCheck size={30} strokeWidth={1.5} color='white' fill='#228b22' />
            <h1 className='text-[#228b22] text-[26px] font-bold'>ĐẶT HÀNG THÀNH CÔNG</h1>
        </div>

        <div className='space-y-2 text-xs text-foreground'>
            <p>Cảm ơn quý khách đã đặt hàng tại WinMart!</p>
            <p>
                Đơn hàng <strong>{orderCode}</strong> đã được tạo thành công. Nếu Quý khách có yêu
                cầu đặc biệt, vui lòng liên hệ nhân viên tư vấn tại hotline{' '}
                <strong>{hotline}</strong>
            </p>
        </div>
    </div>
);

export default OrderSuccessHeader;
