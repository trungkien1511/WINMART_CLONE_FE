import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useAuth } from '@app/auth/useAuth';
import { loginSchema } from '@validations/authSchema';
import Button from '@components/ui/Button';
import FormLayout from '../components/FormLayout';
import { InputAuthField } from '../components/InputAuthField';
import { getApiError } from '@/utils/getApiError';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login, isLoggingIn } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: { phoneNumber: '', password: '' }
    });

    const onSubmit = async (data) => {
        try {
            await login({
                phoneNumber: data.phoneNumber.trim(),
                password: data.password
            });

            enqueueSnackbar('Đăng nhập thành công', { variant: 'success' });
            navigate('/');
        } catch (e) {
            const apiErr = getApiError(e);

            console.log(apiErr);

            const msg = apiErr.details ? Object.values(apiErr.details).join(', ') : apiErr.message;

            enqueueSnackbar(msg, { variant: 'error' });
        }
    };

    return (
        <form className='max-w-full w-full' onSubmit={handleSubmit(onSubmit)} noValidate>
            <fieldset className='flex flex-col gap-5 border-0 mb-3'>
                <legend className='sr-only'>Thông tin đăng nhập</legend>
                <InputAuthField
                    name='phoneNumber'
                    label='Số điện thoại'
                    placeholder='Số điện thoại'
                    control={control}
                    isLoggingIn={isLoggingIn}
                    type='input'
                />
                <InputAuthField
                    name='password'
                    label='Mật khẩu'
                    placeholder='Mật khẩu'
                    control={control}
                    isLoggingIn={isLoggingIn}
                    type='password'
                />
                <Button
                    variant='primary_1'
                    type='submit'
                    isLoading={isLoggingIn}
                    disabled={isLoggingIn}
                >
                    Đăng Nhập
                </Button>
            </fieldset>
        </form>
    );
};

export default function Login() {
    return (
        <FormLayout showForgotPassword title='Đăng nhập' navTo='/register' navLabel='Đăng kí'>
            <LoginForm />
        </FormLayout>
    );
}
