// features/products/components/QuantitySelector.jsx
import { useCallback, useState } from 'react';
import Button from '../../../../components/ui/Button';

const QuantitySelector = ({ label = 'Số lượng', value, max, onChange }) => {
    const updateQuantity = useCallback(
        (next) => {
            if (next < 1) next = 1;
            if (max != null && next > max) next = max;
            onChange?.(next);
        },
        [max, onChange]
    );

    const handleDecrease = useCallback(() => {
        updateQuantity(value - 1);
    }, [value, updateQuantity]);

    const handleIncrease = useCallback(() => {
        updateQuantity(value + 1);
    }, [value, updateQuantity]);

    const isDecreaseDisabled = value <= 1;
    const isIncreaseDisabled = max != null && value >= max;

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
                        disabled={isDecreaseDisabled}
                        aria-label='Giảm số lượng'
                    >
                        -
                    </Button>

                    <Button
                        type='button'
                        className='p-3 rounded-none border text-foreground border-divider min-w-[48px] justify-center'
                        variant='secondary'
                        aria-label={`Số lượng hiện tại ${value}`}
                    >
                        {value}
                    </Button>

                    <Button
                        type='button'
                        className='p-3 rounded-none text-foreground border border-divider'
                        variant='secondary'
                        onClick={handleIncrease}
                        disabled={isIncreaseDisabled}
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
