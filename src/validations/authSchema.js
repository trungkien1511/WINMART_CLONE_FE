import * as yup from 'yup';

export const loginSchema = yup.object({
    phoneNumber: yup
        .string()
        .transform((value) => value?.replace(/\s+/g, '')) // ✅ bỏ mọi dấu cách
        .required('Thông tin bắt buột')
        .matches(/^0\d{9}$/, 'Số điện thoại không hợp lệ'),
    password: yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Thông tin bắt buột')
});

export const registerSchema = yup.object({
    phoneNumber: yup
        .string()
        .transform((value) => value?.replace(/\s+/g, '')) // ✅ bỏ mọi dấu cách
        .required('Thông tin bắt buột')
        .matches(/^0\d{9}$/, 'Số điện thoại không hợp lệ'),
    password: yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Thông tin bắt buột'),
    fullName: yup
        .string()
        .required('Thông tin bắt buột')
        .matches(/^[^\d]*$/, 'Họ tên không được chứa số'),
    birthday: yup
        .date()
        .required('Thông tin bắt buột')
        .test('valid-date', 'Ngày sinh không hợp lệ', (v) => {
            if (!v) return false;
            const d = new Date(v);
            return !Number.isNaN(d.getTime()) && d <= new Date();
        }),
    gender: yup.string().required('Thông tin bắt buột'),
    referralCode: yup.string().optional()
});

export const forgotPasswordSchema = yup.object({
    phoneNumber: yup
        .string()
        .required('Vui lòng nhập số điện thoại để khôi phục')
        .matches(/^0\d{9}$/, 'Số điện thoại không hợp lệ')
});
