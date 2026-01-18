import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import routes from './routes';
import ScrollToTop from '../components/ui/ScrollToTop';
import Delayed from '../components/ui/Delayed';
import { QueryProvider } from './provider/QueryProvider';
import { AuthProvider } from '@/app/auth/AuthProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function AppRoutes() {
    return (
        <QueryProvider>
            <AuthProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <BrowserRouter>
                        <ScrollToTop />
                        <Routes>
                            {routes.map((route, idx) => {
                                const Layout = route.layout || (({ children }) => <>{children}</>);
                                const Component = route.component;

                                return (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        element={
                                            <Suspense fallback={<Delayed />}>
                                                <Layout>
                                                    <Component />
                                                </Layout>
                                            </Suspense>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </BrowserRouter>
                </LocalizationProvider>
            </AuthProvider>
        </QueryProvider>
    );
}
