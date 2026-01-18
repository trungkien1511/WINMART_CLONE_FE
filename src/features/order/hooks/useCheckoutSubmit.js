import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import orderService from '../apis/orderService';
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

            const orderCode = res?.data?.orderCode;
            if (!orderCode) {
                enqueueSnackbar('Không lấy được mã đơn hàng', { variant: 'error' });
                return;
            }

            const method = String(data.paymentMethod || '')
                .trim()
                .toUpperCase();

            // COD
            if (method === 'COD') {
                sessionStorage.setItem('ALLOW_ORDER_SUCCESS', '1');
                navigate('/order-success', { state: { orderCode } });
                return;
            }

            // VNPAY
            if (method === 'VNPAY') {
                const paymentUrl = res?.data?.paymentUrl;
                if (!paymentUrl) {
                    enqueueSnackbar('Không lấy được link thanh toán', { variant: 'error' });
                    return;
                }

                // ✅ quan trọng: để /vnpay-return biết đơn nào khi VNPAY redirect về
                sessionStorage.setItem('PENDING_ORDER_CODE', orderCode);

                // replace để khó back lại checkout (optional)
                window.location.replace(paymentUrl);
                return;
            }

            enqueueSnackbar('Phương thức thanh toán không hợp lệ', { variant: 'error' });
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (!e.response) {
                    enqueueSnackbar('Không thể kết nối máy chủ, vui lòng kiểm tra mạng', {
                        variant: 'error'
                    });
                    return;
                }

                if (e.response.status === 400) {
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
