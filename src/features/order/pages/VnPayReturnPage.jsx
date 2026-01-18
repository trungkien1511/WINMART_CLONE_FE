import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '@services/axiosClient';

export default function VnPayReturnPage() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const query = location.search; // ?vnp_...
        const params = new URLSearchParams(query);

        // ✅ orderCode chắc chắn có vì bạn set = vnp_TxnRef
        const orderCode = params.get('vnp_TxnRef');

        if (!orderCode) {
            navigate('/checkout', { replace: true });
            return;
        }

        axiosClient
            .get(`/payments/vnpay/return${query}`)
            .then((res) => {
                if (res?.data?.success === false) {
                    navigate('/checkout', { replace: true });
                    return;
                }

                sessionStorage.setItem('ALLOW_ORDER_SUCCESS', '1');

                navigate('/order-success', {
                    state: { orderCode },
                    replace: true
                });
            })
            .catch(() => {
                navigate('/checkout', { replace: true });
            });
    }, [location.search, navigate]);

    return <p>Đang xử lý thanh toán...</p>;
}
