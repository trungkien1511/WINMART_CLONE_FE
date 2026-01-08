import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import orderService from './apis/orderService';
import axios from 'axios';

export const useCheckoutSubmit = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    return async (data) => {
        try {
            const payload = {
                receiverName: data.receiverName,
                receiverPhone: data.receiverPhone,
                regionText: data.regionText,
                addressLine: data.addressLine,
                paymentMethod: data.paymentMethod,
                note: data.note || null
            };

            const res = await orderService.create(payload);

            if (payload.paymentMethod === 'COD') {
                navigate('/order-success');
                return;
            }

            const paymentUrl = res?.data?.paymentUrl;
            if (!paymentUrl) throw new Error('Missing paymentUrl in response');
            window.location.href = paymentUrl;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const status = e.response?.status;
                if (status === 400) {
                    enqueueSnackbar(
                        e.response?.data?.message || 'Giỏ hàng trống hoặc dữ liệu không hợp lệ',
                        { variant: 'error' }
                    );
                    return;
                }
                enqueueSnackbar('Có lỗi xảy ra, vui lòng thử lại', { variant: 'error' });
                return;
            }
            enqueueSnackbar('Lỗi không xác định', { variant: 'error' });
        }
    };
};
