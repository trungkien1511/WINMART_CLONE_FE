import { Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@components/ui/Button';

const FormLayout = ({
    title,
    children,
    showForgotPassword,
    navTo,
    navLabel,
    headerOnLeft = false
}) => {
    const navigate = useNavigate();

    return (
        <div className='max-w-full w-full flex flex-col'>
            <h1
                className={`mt-6 mb-9 w-full ${headerOnLeft ? 'text-left' : 'text-center'} text-md text-foreground`}
            >
                {title}
            </h1>

            {children}

            <nav className='flex flex-col items-center gap-3'>
                {showForgotPassword && (
                    <Link to='/forgot-password' className='text-center'>
                        <span className='text-brand-primary text-sm hover:underline'>
                            Quên mật khẩu
                        </span>
                    </Link>
                )}

                <Divider sx={{ width: '100%' }}>
                    <span className='text-foreground text-xs'>Hoặc</span>
                </Divider>

                <Button
                    type='button'
                    variant='secondary'
                    className='max-w-full w-full py-2 font-light'
                    onClick={() => navigate(navTo)}
                >
                    {navLabel}
                </Button>
            </nav>
        </div>
    );
};

export default FormLayout;
