import { Plus, Minus } from 'lucide-react';

const QuantityStepper = ({
    value,
    onChange,
    min = 1,
    max = 999,
    step = 1,
    disabled = false,
    variant = 'cart', // 'cart' | 'product'
    className = ''
}) => {
    const decDisabled = disabled || value <= min;
    const incDisabled = disabled || value >= max;

    const handleDec = () => onChange(Math.max(min, value - step));
    const handleInc = () => onChange(Math.min(max, value + step));

    const rootClass =
        variant === 'product'
            ? 'inline-flex items-center border border-divider overflow-hidden'
            : 'inline-flex items-center rounded border border-brand-primary overflow-hidden';

    const btnClass =
        variant === 'product'
            ? 'px-2 py-2 text-foreground disabled:opacity-50 cursor-pointer'
            : 'px-2 py-2 text-brand-primary disabled:opacity-50 cursor-pointer';

    const inputClass =
        variant === 'product'
            ? 'w-9 text-center focus:outline-none focus:ring-0'
            : 'w-15 text-center text-brand-primary focus:outline-none focus:ring-0';

    // ✅ chỉ cho phép gõ ở product variant
    const handleInputChange = (e) => {
        const raw = e.target.value;

        // cho phép user xoá tạm (optional)
        if (raw === '') return;

        const next = Number.parseInt(raw, 10);
        if (Number.isNaN(next)) return;

        const clamped = Math.min(max, Math.max(min, next));
        onChange(clamped);
    };

    return (
        <div className={`${rootClass} ${className}`}>
            <button
                type='button'
                className={variant === 'cart' ? btnClass : `border-r border-divider ${btnClass}`}
                onClick={handleDec}
                disabled={decDisabled}
            >
                <Minus className='w-4 h-4' />
            </button>

            <input
                type='text'
                className={inputClass}
                aria-label={`Số lượng hiện tại ${value}`}
                value={value}
                readOnly={variant === 'cart'} // ✅ cart: chỉ hiển thị
                tabIndex={variant === 'cart' ? -1 : 0} // ✅ cart: không focus
                onChange={variant === 'product' ? handleInputChange : undefined} // ✅
            />

            <button
                type='button'
                className={variant === 'cart' ? btnClass : `border-l border-divider ${btnClass}`}
                onClick={handleInc}
                disabled={incDisabled}
            >
                <Plus className='w-4 h-4' />
            </button>
        </div>
    );
};

export default QuantityStepper;
