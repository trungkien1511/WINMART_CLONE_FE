// features/products/components/QuantitySelector.jsx
import { useState } from 'react';
import Button from '../../../../components/ui/Button';

const QuantitySelector = ({ label = 'Số lượng', value, min = 1, max, onChange }) => {
    const [internalValue, setInternalValue] = useState(value ?? min);

    const quantity = value ?? internalValue;

    const updateQuantity = (next) => {
        if (next < min) next = min;
        if (max != null && next > max) next = max;

        if (!value) {
            setInternalValue(next);
        }
        onChange?.(next);
    };

    const handleDecrease = () => updateQuantity(quantity - 1);
    const handleIncrease = () => updateQuantity(quantity + 1);

    return (
        <div className='pt-5 pb-2.5 text-xs/[1.5rem]'>
            <div className='flex w-full items-center'>
                <div className='basis-1/4 pl-2.5'>
                    <span>{label}</span>
                </div>

                <div className='basis-3/4 flex items-center gap-1'>
                    <Button
                        type='button'
                        className='p-3 rounded-none text-foreground border border-divider'
                        variant='secondary'
                        onClick={handleDecrease}
                        disabled={quantity <= min}
                        aria-label='Giảm số lượng'
                    >
                        -
                    </Button>

                    <Button
                        type='button'
                        className='p-3 rounded-none border text-foreground border-divider min-w-[48px] justify-center'
                        variant='secondary'
                        aria-label={`Số lượng hiện tại ${quantity}`}
                    >
                        {quantity}
                    </Button>

                    <Button
                        type='button'
                        className='p-3 rounded-none text-foreground border border-divider'
                        variant='secondary'
                        onClick={handleIncrease}
                        disabled={max != null && quantity >= max}
                        aria-label='Tăng số lượng'
                    >
                        +
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QuantitySelector;
