import { TextField, Divider, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useAuth } from '@app/auth/useAuth';
import axios from 'axios';
import { loginSchema } from '@validations/authSchema';
import Button from '@components/ui/Button';
import { muiTextFieldSx } from '@styles/muiTextFieldSx';

export default function Login() {
    const navigate = useNavigate();
    const { login, isLoggingIn } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: { phoneNumber: '', password: '' }
    });

    const onSubmit = async (data) => {
        try {
            await login({
                phoneNumber: data.phoneNumber,
                password: data.password
            });

            enqueueSnackbar('Đăng nhập thành công', {
                variant: 'success'
            });
            navigate('/');
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const status = e.response?.status;

                // 400/401: sai credentials / sai input
                if (status === 400 || status === 403) {
                    enqueueSnackbar('Sai số điện thoại hoặc mật khẩu', { variant: 'error' });
                    return;
                }

                // network / server
                enqueueSnackbar('Có lỗi xảy ra, vui lòng thử lại', { variant: 'error' });
                return;
            }

            enqueueSnackbar('Lỗi không xác định', { variant: 'error' });
        }
    };

    return (
        <div className='max-w-full w-full flex flex-col'>
            <h1 className='mt-6 mb-9 w-full text-center text-md text-foreground'>Đăng nhập</h1>
            <form className='max-w-full w-full' onSubmit={handleSubmit(onSubmit)} noValidate>
                <fieldset className='flex flex-col gap-5 border-0 mb-3'>
                    <legend className='sr-only'>Thông tin đăng nhập</legend>
                    <Controller
                        name='phoneNumber'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label='Số điện thoại'
                                placeholder='Số điện thoại'
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber?.message}
                                sx={muiTextFieldSx}
                            />
                        )}
                    />
                    <Controller
                        name='password'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label='Mật khẩu'
                                placeholder='Mật khẩu'
                                type='password'
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                sx={muiTextFieldSx}
                            />
                        )}
                    />
                    <Button
                        variant='primary'
                        type='submit'
                        className='max-w-full w-full py- font-light'
                        size='md'
                    >
                        Đăng nhập
                    </Button>
                </fieldset>
            </form>

            <nav className='flex flex-col items-center gap-3'>
                {/* Forgot Password Link */}
                <Link to='/forgot-password' className='text-center '>
                    <span className='text-brand-primary text-sm hover:underline'>
                        Quên mật khẩu
                    </span>
                </Link>

                {/* Divider */}
                <Divider sx={{ width: '100%' }}>
                    <span className='text-foreground text-xs'>Hoặc</span>
                </Divider>

                {/* Register Button - CÁCH 1: onClick */}
                <Button
                    variant='secondary'
                    className='max-w-full w-full py-2'
                    onClick={() => navigate('/register')}
                >
                    Đăng kí
                </Button>
            </nav>
        </div>
    );
}
