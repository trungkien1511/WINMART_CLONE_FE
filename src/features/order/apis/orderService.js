import axiosClient from '../../../services/axiosClient';

const orderService = {
    create: (payload) => axiosClient.post('/orders', payload),
    getDetail: (orderCode) => axiosClient.get(`/orders/${orderCode}`)
};

export default orderService;
