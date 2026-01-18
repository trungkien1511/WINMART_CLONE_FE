import { memo } from 'react';
import clsx from 'clsx';

const Button = memo(
    ({
        children,
        startIcon,
        endIcon,
        variant = 'primary',
        size = 'md',
        isLoading = false,
        className,
        ...rest
    }) => {
        const variantClass = {
            primary: 'btn--primary',
            primary_1: 'btn--primary-1',
            secondary: 'btn--secondary',
            secondary_1: 'btn--secondary-1',
            normal: 'btn--normal',
            normal_active: 'btn--normal-active'
        }[variant];

        const sizeClass = {
            sm: 'btn--sm',
            md: 'btn--md',
            lg: 'btn--lg'
        }[size];

        return (
            <button
                {...rest}
                disabled={isLoading || rest.disabled}
                aria-busy={isLoading}
                className={clsx('btn', variantClass, sizeClass, className, {
                    'opacity-60 cursor-not-allowed': isLoading
                })}
            >
                {isLoading ? (
                    <span className='flex items-center gap-2'>
                        {/* Optional: Thêm spinner icon */}
                        <span>Đang xử lý...</span>
                    </span>
                ) : (
                    <>
                        {startIcon}
                        {children}
                        {endIcon}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
