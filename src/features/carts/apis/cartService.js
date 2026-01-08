import axiosClient from '@services/axiosClient';

const cartService = {
    getCart() {
        return axiosClient.get('/cart');
    },

    addItem({ productPackagingId, quantity }) {
        return axiosClient.post('/cart/items', {
            productPackagingId,
            quantity
        });
    },
    updateItemQty({ cartItemId, quantity }) {
        return axiosClient.patch(`/cart/items/${cartItemId}`, { quantity });
    },
    deleteItem(cartItemId) {
        return axiosClient.delete(`/cart/items/${cartItemId}`);
    },
    // services/cartService.js
    clearCart() {
        return axiosClient.delete('/cart/items');
    }
};

export default cartService;
