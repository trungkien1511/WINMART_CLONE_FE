import axiosClient from '../../../services/axiosClient';

const orderService = {
    create: (payload) => axiosClient.post('/orders', payload),
    getDetail: (orderId) => axiosClient.get(`/api/orders/${orderId}`)
};

export default orderService;
