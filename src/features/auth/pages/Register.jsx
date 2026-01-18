import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useAuth } from '@app/auth/useAuth';
import { registerSchema } from '@validations/authSchema';
import Button from '@components/ui/Button';
import FormLayout from '../components/FormLayout';
import { InputAuthField } from '../components/InputAuthField';
import { InputAuthDatePicker } from '../components/InputAuthDatePicker';
import { InputGenderRadio } from '../components/GenderRadio';
import { getApiError } from '@utils/getApiError';

const Register = () => {
    const navigate = useNavigate();
    const { register, isRegistering } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            username: '',
            birthday: null,
            gender: '',
            referralCode: ''
        }
    });

    const formatDateOnly = (d) => {
        if (!d) return '';
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`; // YYYY-MM-DD
    };

    const onSubmit = async (data) => {
        const payload = {
            phoneNumber: data.phoneNumber.trim(),
            fullName: data.fullName.trim(),
            password: data.password,
            gender: data.gender,
            referralCode: data.referralCode?.trim() || '',
            dateOfBirthday: formatDateOnly(data.birthday) // "YYYY-MM-DD"
        };

        console.log(payload);

        try {
            await register(payload);
            enqueueSnackbar('Đăng ký thành công', { variant: 'success' });
            navigate('/');
        } catch (e) {
            const apiErr = getApiError(e);

            const msg = apiErr.details ? Object.values(apiErr.details).join(', ') : '';

            enqueueSnackbar(msg, { variant: 'error' });
        }
    };

    const onInvalid = (errors) => {
        console.log('INVALID', errors);
    };

    return (
        <form className='max-w-full w-full' onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
            <fieldset className='flex flex-col gap-5 border-0 mb-3'>
                <legend className='sr-only'>Thông tin đăng nhập</legend>
                <InputAuthField
                    name='phoneNumber'
                    label='Số điện thoại'
                    placeholder='Số điện thoại'
                    control={control}
                    isLoggingIn={isRegistering}
                    type='input'
                    isRequired={true}
                />
                <InputAuthField
                    name='password'
                    label='Mật khẩu'
                    placeholder='Mật khẩu'
                    control={control}
                    isLoggingIn={isRegistering}
                    type='password'
                    isRequired={true}
                />

                <InputAuthField
                    name='fullName'
                    label='Họ tên'
                    placeholder='Họ tên'
                    control={control}
                    isLoggingIn={isRegistering}
                    type='input'
                    isRequired={true}
                />
                <InputAuthDatePicker
                    name='birthday'
                    label='Ngày sinh'
                    control={control}
                    disabled={isRegistering}
                />
                <InputGenderRadio control={control} disabled={isRegistering} />
                <InputAuthField
                    name='referralCode'
                    label='Mã giới thiệu'
                    placeholder='Mã giới thiệu'
                    control={control}
                    isLoggingIn={isRegistering}
                    type='input'
                    isRequired={false}
                />

                <Button
                    variant='primary_1'
                    type='submit'
                    isLoading={isRegistering}
                    disabled={isRegistering}
                >
                    Tiếp tục
                </Button>
            </fieldset>
        </form>
    );
};

export default function Login() {
    return (
        <FormLayout
            title='Đăng kí hội viên '
            navTo='/login'
            navLabel='Đăng nhập'
            headerOnLeft={true}
        >
            <Register />
        </FormLayout>
    );
}
