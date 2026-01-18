import { lazy } from 'react';
import AuthLayout from '@app/layouts/AuthLayout';
import MainLayout from '@app/layouts/MainLayout';

// Lazy load các trang
const Home = lazy(() => import('@features/home/pages/HomePage'));
const Login = lazy(() => import('@features/auth/pages/Login'));
const Register = lazy(() => import('@features/auth/pages/Register'));
const ProductDetailPage = lazy(() => import('@features/products/pages/ProductDetailPage'));
const CategoryPage = lazy(() => import('@features/categories/pages/CategoryPage'));
const CartPage = lazy(() => import('@features/carts/pages/CartPage'));
const CheckoutPage = lazy(() => import('@features/checkout/pages/CheckoutPage'));
const OrderPage = lazy(() => import('@features/order/pages/OrderPage'));
const VnPayReturnPage = lazy(() => import('@features/order/pages/VnPayReturnPage'));

const routers = [
    {
        path: '/',
        component: Home,
        layout: MainLayout
    },
    {
        path: '/login',
        component: Login,
        layout: AuthLayout
    },
    {
        path: '/register',
        component: Register,
        layout: AuthLayout
    },
    {
        path: '/products/:slug',
        component: ProductDetailPage,
        layout: MainLayout
    },
    {
        path: '/categories/:slug',
        component: CategoryPage,
        layout: MainLayout
    },
    {
        path: '/cart',
        component: CartPage,
        layout: MainLayout
    },
    {
        path: '/checkout',
        component: CheckoutPage,
        layout: MainLayout
    },
    {
        path: '/order-success',
        component: OrderPage,
        layout: MainLayout
    },
    {
        path: '/vnpay-return',
        component: VnPayReturnPage,
        layout: MainLayout
    }
];

export default routers;
