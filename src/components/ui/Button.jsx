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
            secondary: 'btn--secondary',
            normal: 'flex gap-2 item-center justify-start text-xs font-light bg-[#8080800d] px-2 py-2.5 cursor-pointer',
            normal_active:
                'justify-start text-left text-xs font-light bg-[#8080800d] px-2 py-2.5 cursor-pointer ring ring-brand-primary'
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
