import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';
import logo from '/src/assets/icons/redlogo.svg';

export default function AuthLayout({ children }) {
    return (
        <Box bgcolor='#f0f8ff' display='flex' justifyContent='center' minHeight='100vh'>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                bgcolor='white'
                width={{ xs: '90%', sm: 400 }}
                p={4}
            >
                {/* Header chung */}
                <Box
                    width='100%'
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    mb={4}
                >
                    <IconButton component={RouterLink} to='/'>
                        <ArrowBackIcon />
                    </IconButton>
                    <Box component='img' src={logo} alt='Logo' sx={{ height: 40 }} />
                    <IconButton component={RouterLink} to='/'>
                        <HomeIcon />
                    </IconButton>
                </Box>

                {/* Nội dung của từng trang (Login, Register...) */}
                {children}
            </Box>
        </Box>
    );
}
