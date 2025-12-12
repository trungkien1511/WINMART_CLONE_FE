import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import routes from './routes';
import { QueryProvider } from './provider/QueryProvider';
import ScrollToTop from '../components/ui/ScrollToTop';

export default function AppRoutes() {
    return (
        <QueryProvider>
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
                                    <Layout>
                                        <Suspense>
                                            <Component />
                                        </Suspense>
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </QueryProvider>
    );
}
