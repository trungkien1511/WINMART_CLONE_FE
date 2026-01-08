import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useUpdateCartItemQuantity } from '../hooks/useUpdateCartItemQty';
import { useRemoveCartItem } from '../hooks/useRemoveCartItem';
import { useClearCart } from '../hooks/useClearCart';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import EmptyCart from '../components/EmptyCart';
const CartPage = () => {
    const { data: cart } = useCart();
    const updateQty = useUpdateCartItemQuantity();
    const removeItem = useRemoveCartItem();
    const clearCart = useClearCart();
    const navigate = useNavigate();

    const cartItems = cart.items ?? [];

    const handleChangeQty = (itemId, nextQty) => {
        if (nextQty < 0) return;

        updateQty.mutate({
            cartItemId: itemId,
            quantity: nextQty
        });
    };

    const handleRemove = (itemId) => {
        removeItem.mutate(itemId);
    };

    const handleClearCart = () => {
        if (cartItems.length === 0) return;
        clearCart.mutate();
    };

    if (cartItems.length === 0) {
        return (
            <section className='bg-white'>
                <div className='my-6'>
                    <EmptyCart onNavigateHome={() => navigate('/')} />
                </div>
            </section>
        );
    }

    return (
        <section className='bg-white'>
            <div className='my-6 flex'>
                <div className='max-w-[68%] w-full'>
                    {cartItems.map((item) => (
                        <CartItem
                            item={item}
                            onRemove={handleRemove}
                            onChangeQty={handleChangeQty}
                            key={item.cartItemId}
                        />
                    ))}

                    <div className='mx-4 my-2 w-fit'>
                        <button
                            type='button'
                            onClick={handleClearCart}
                            className='underline text-sm text-foreground cursor-pointer'
                        >
                            Xóa giỏ hàng
                        </button>
                    </div>
                </div>
                <CartSummary summary={cart.summary} />
            </div>
        </section>
    );
};

export default CartPage;
