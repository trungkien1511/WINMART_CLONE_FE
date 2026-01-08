import { Radio } from '@mui/material';
import vnpayLogo from '@assets/images/logoVnpay.png';
import { Controller } from 'react-hook-form';
import { Wallet } from 'lucide-react';

const PaymentForm = ({ control }) => {
    return (
        <section className='p-4 bg-white '>
            <div className='w-70'>
                <h2 className='text-sm font-semibold text-foreground mb-3'>
                    Phương thức thanh toán
                </h2>

                <Controller
                    name='paymentMethod'
                    control={control}
                    defaultValue='COD'
                    render={({ field }) => {
                        return (
                            <div className='space-y-3' role='radio'>
                                <PaymentOption
                                    value='COD'
                                    label='Tiền mặt (COD)'
                                    icon={<Wallet size={20} strokeWidth={1.5} />}
                                    selected={field.value === 'COD'}
                                    onChange={(v) => field.onChange(v)}
                                />
                                <PaymentOption
                                    value='VNPAY'
                                    label='Thanh toán trực tuyến (VNPay)'
                                    icon={<img src={vnpayLogo} alt='' className='w-5 h-5' />}
                                    selected={field.value === 'VNPAY'}
                                    onChange={(v) => field.onChange(v)}
                                />
                            </div>
                        );
                    }}
                />
            </div>
        </section>
    );
};

const PaymentOption = ({ value, label, icon, selected, onChange }) => {
    const optionId = `payment-${value}`;

    return (
        <div
            className={`flex items-center bg-gray-100 border rounded cursor-pointer transition-colors
                ${selected ? 'border-brand-primary' : 'border-divider'}`}
            onClick={() => onChange(value)}
            role='button'
            tabIndex={0}
            aria-pressed={selected}
        >
            <Radio
                id={optionId}
                checked={selected}
                value={value}
                onChange={() => onChange(value)}
                color='default'
                size='small'
                sx={{ padding: 1 }}
                aria-label={label}
            />
            <div className='flex items-center gap-2 cursor-pointer py-2 pr-3'>
                {icon}
                <span className={`text-xs ${selected ? 'font-semibold' : 'font-normal'}`}>
                    {label}
                </span>
            </div>
        </div>
    );
};

export default PaymentForm;
