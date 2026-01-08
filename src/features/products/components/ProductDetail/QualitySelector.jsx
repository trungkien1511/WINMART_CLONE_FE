// features/products/components/QuantitySelector.jsx
import { memo } from 'react';
import QuantityStepper from './QuantityStepper';

const QuantitySelector = memo(({ value, max, onChange }) => {
    return (
        <div className='pt-5 pb-2.5 text-xs/[1.5rem]'>
            <div className='flex w-full items-center'>
                <div className='basis-1/4 pl-2.5'>
                    <span>Số lượng</span>
                </div>

                <div className='basis-3/4 flex items-center'>
                    <QuantityStepper
                        variant='product'
                        value={value}
                        max={max}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
});

export default QuantitySelector;
