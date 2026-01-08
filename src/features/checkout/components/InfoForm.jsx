import InputRow from '@components/ui/InputRow';

const InfoForm = ({ register, errors }) => {
    return (
        <section className=' p-4 bg-white mb-2'>
            <div className='flex items-center justify-between mb-3'>
                <h2 className='text-sm font-semibold text-foreground'>Thông tin đặt hàng</h2>
            </div>

            <div className='space-y-3.75'>
                <InputRow
                    name='receiverName'
                    label='Họ tên người nhận'
                    registerFn={register}
                    error={errors?.receiverName}
                    isRequired={true}
                />
                <InputRow
                    name='receiverPhone'
                    label='Số điện thoại'
                    registerFn={register}
                    error={errors?.receiverPhone}
                    isRequired={true}
                />
                <InputRow
                    name='regionText'
                    label='Khu vực giao hàng'
                    registerFn={register}
                    error={errors?.regionText}
                    isRequired={true}
                />
                <InputRow
                    name='addressLine'
                    label='Địa chỉ'
                    registerFn={register}
                    error={errors?.addressLine}
                    isRequired={true}
                />
                <InputRow label='Mã nhân viên' />
            </div>
        </section>
    );
};

export default InfoForm;
