import { memo } from 'react';
import clsx from 'clsx';

const Button = memo(
    ({
        children,
        startIcon,
        endIcon,
        variant = 'primary', // primary | secondary
        size = 'md', // sm | md | lg
        isLoading = false,
        className,
        ...rest
    }) => {
        const variantClass = {
            primary: 'btn--primary',
            secondary: 'btn--secondary',
            header: 'justify-start text-left text-xs font-light border-none bg-[#8080800d] px-2 py-2.5 cursor-pointer'
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
                className={clsx('btn', variantClass, sizeClass, className)}
            >
                {isLoading ? (
                    <span>Đang xử lý...</span>
                ) : (
                    <>
                        {startIcon && <span>{startIcon}</span>}
                        <span>{children}</span>
                        {endIcon && <span>{endIcon}</span>}
                    </>
                )}
            </button>
        );
    }
);

export default Button;
