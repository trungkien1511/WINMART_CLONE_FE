import { checkoutInputClass } from '@styles/checkoutInput';

const TextField = ({ name, label, registerFn }) => {
    const canRegister = typeof registerFn === 'function' && !!name;

    return (
        <input
            id={name}
            {...(canRegister ? registerFn(name) : {})}
            className={checkoutInputClass}
            placeholder={label}
        />
    );
};

export default TextField;
