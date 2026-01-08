import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkoutSchema } from '../../../validations/checkoutSchema';
import { useGetCheckout } from '../hooks/useGetCheckout';

import InfoForm from '../components/InfoForm';
import PaymentForm from '../components/PaymentForm';
import NoteForm from '../components/NoteForm';
import OrderSummary from '../components/OrderSummary';
import { useCheckoutSubmit } from '../../order/hooks/useCheckoutSubmit';

const CheckoutPage = () => {
    const { data: checkout } = useGetCheckout();
    const onSubmit = useCheckoutSubmit();
    const orderSummary = checkout.pricing;

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(checkoutSchema),
        defaultValues: {
            receiverName: '',
            receiverPhone: '',
            regionText: '',
            addressLine: '',
            employeeCode: '',
            paymentMethod: 'COD',
            note: ''
        },
        mode: 'onTouched'
    });

    return (
        <form className='max-w-full w-full' onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='flex flex-col my-3.5'>
                {/* Section: Thông tin đặt hàng */}
                <InfoForm register={register} errors={errors} />

                {/* Section: Phương thức thanh toán */}
                <PaymentForm control={control} />

                <div className='h-px bg-divider' />

                {/* Section: Note */}
                <NoteForm register={register} />

                <OrderSummary summary={orderSummary} />
            </div>
        </form>
    );
};

export default CheckoutPage;
