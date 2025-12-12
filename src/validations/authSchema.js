import * as yup from 'yup';

export const loginSchema = yup.object({
    phoneNumber: yup
        .string()
        .required('Vui lòng nhập số điện thoại')
        .matches(/^0\d{9}$/, 'Số điện thoại phải có 10 số và bắt đầu bằng 0'),
    password: yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu')
});

export const registerSchema = yup.object({
    phoneNumber: yup.string().required('Vui lòng nhập họ tên'),
    username: yup
        .string()
        .required('Vui lòng nhập số điện thoại')
        .matches(/^0\d{9}$/, 'Số điện thoại không hợp lệ'),
    password: yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không khớp'),
    birthday: yup
        .date()
        .required('Vui lòng chọn ngày sinh')
        .max(new Date(), 'Ngày sinh không hợp lệ'),
    gender: yup.string().required('Vui lòng chọn giới tính'),
    referralCode: yup.string().optional()
});

export const forgotPasswordSchema = yup.object({
    phoneNumber: yup
        .string()
        .required('Vui lòng nhập số điện thoại để khôi phục')
        .matches(/^0\d{9}$/, 'Số điện thoại không hợp lệ')
});
