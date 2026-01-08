import product_temp from '@assets/images/product_temp.png';
import { formatPrice } from '@features/products/utils/formatPrice.js';
import { Link } from 'react-router-dom';
import QuantityStepper from '@features/products/components/ProductDetail/QuantityStepper';
import Button from '@components/ui/Button';
import { X } from 'lucide-react';

const CartItem = ({ item, onChangeQty, onRemove }) => {
    const maxQty = item.stockQuantity ?? 999;
    return (
        <article className='flex items-center px-4 py-2' key={item.cartItemId}>
            <figure className='w-16 h-16'>
                <Link to={`/products/${item.productSlug}`}>
                    <img
                        src={product_temp}
                        alt=''
                        className='w-full h-full object-cover'
                        loading='lazy'
                    />
                </Link>
            </figure>

            <div className='w-full flex justify-between items-center'>
                <div className='text-foreground w-1/2'>
                    <p className='text-xs'>{item.productName}</p>
                    <p className='text-[11px]'>ĐVT: {item.packagingType}</p>
                </div>

                <div className='flex justify-between items-center w-62.5'>
                    <div className='w-1/2'>
                        <p className='text-foreground text-xs'>{formatPrice(item.finalPrice)}</p>
                        {item.onSale && (
                            <del className='text-muted-foreground text-xs leading-none'>
                                {formatPrice(item.unitPrice)}
                            </del>
                        )}
                    </div>

                    <QuantityStepper
                        variant='cart'
                        max={maxQty}
                        min={0}
                        value={item.quantity}
                        onChange={(next) => onChangeQty(item.cartItemId, next)}
                    />
                </div>
            </div>

            <Button
                onClick={() => onRemove(item.cartItemId)}
                className='p-2.5 border-none ml-2'
                variant='secondary'
                aria-label='Xóa sản phẩm'
            >
                <X className='w-4 h-4' />
            </Button>
        </article>
    );
};

export default CartItem;
