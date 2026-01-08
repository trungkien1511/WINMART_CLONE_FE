import * as yup from 'yup';

export const checkoutSchema = yup.object({
    receiverName: yup.string().trim().required('Thông tin bắt buộc'),
    receiverPhone: yup
        .string()
        .required('Thông tin bắt buộc')
        .matches(/^(0|\+84)\d{9}$/, 'Số điện thoại không hợp lệ'),
    regionText: yup.string().trim().required('Thông tin bắt buộc'),
    addressLine: yup.string().trim().required('Thông tin bắt buộc'),
    paymentMethod: yup.string().oneOf(['COD', 'VNPAY']),
    note: yup.string().max(500, 'Ghi chú tối đa 500 ký tự').nullable(),
    employeeCode: yup.string().nullable()
});
