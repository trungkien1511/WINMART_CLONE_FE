import axiosClient from '@services/axiosClient';

const checkoutService = {
    summaryCheckout: () => axiosClient.get('/checkout/summary')
};

export default checkoutService;
