import {
    Box,
    Button,
    TextField,
    Typography,
    Divider,
    Link,
    Stack,
    CircularProgress
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useAuth } from '@hooks/useAuth';
import { loginSchema } from '@validations/authSchema';

export default function Login() {
    const { handleLogin, loading } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            phoneNumber: '',
            password: ''
        }
    });

    const onSubmit = async (data) => {
        const result = await handleLogin(data.phoneNumber, data.password);

        if (result?.success) {
            enqueueSnackbar('Đăng nhập thành công!', { variant: 'success' });
            reset();
            navigate('/');
        } else {
            enqueueSnackbar(result?.message || 'Sai tài khoản hoặc mật khẩu!', {
                variant: 'error'
            });
        }
    };

    return (
        <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }} noValidate>
            <Stack spacing={3} width='100%' alignItems='center'>
                <Typography variant='h6'>Đăng nhập</Typography>

                {/* Số điện thoại */}
                <Controller
                    name='phoneNumber'
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label='Số điện thoại'
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber?.message}
                        />
                    )}
                />

                {/* Mật khẩu */}
                <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label='Mật khẩu'
                            type='password'
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    )}
                />

                {/* Nút đăng nhập */}
                <Button
                    fullWidth
                    variant='loginButton'
                    type='submit'
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color='inherit' /> : null}
                >
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>

                {/* Quên mật khẩu */}
                <Link component={RouterLink} to='/forgot-password' underline='hover'>
                    Quên mật khẩu?
                </Link>

                {/* Hoặc */}
                <Divider sx={{ width: '100%' }}>
                    <Typography variant='body2' color='text.secondary'>
                        Hoặc
                    </Typography>
                </Divider>

                {/* Nút đăng ký */}
                <Button variant='registerButton' fullWidth component={RouterLink} to='/register'>
                    Đăng ký
                </Button>
            </Stack>
        </Box>
    );
}
