import App from '../App';
import NotFoundPage from '../Pages/404NotFound/NotFoundPage';
import Dashboard from '../Pages/Admin/Dashboard';
import Cart from '../Pages/Cart/Cart';
import CheckOut from '../Pages/checkout/CheckOut';
import DetailBlog from '../Pages/DetailBlog/DetailBlog';
import DetailProduct from '../Pages/DetailProduct/DetailProduct';
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword';
import InfoUser from '../Pages/InfoUser/InfoUser';
import LoginUser from '../Pages/Login/Login';
import Payments from '../Pages/Payments/Payments';
import RegisterUser from '../Pages/Register/Register';

const publicRoutes = [
    {
        path: '/',
        component: <App />,
    },
    {
        path: '/sort',
        component: <App />,
    },
    {
        path: '/login',
        component: <LoginUser />,
    },
    {
        path: '/register',
        component: <RegisterUser />,
    },
    {
        path: '/:name/:id',
        component: <DetailProduct />,
    },
    {
        path: '/cart',
        component: <Cart />,
    },
    {
        path: '/payments',
        component: <Payments />,
    },
    {
        path: '/customer',
        component: <InfoUser />,
    },

    {
        path: '/order',
        component: <InfoUser />,
    },

    {
        path: '/review',
        component: <InfoUser />,
    },

    {
        path: '/favorite',
        component: <InfoUser />,
    },

    {
        path: '/address',
        component: <InfoUser />,
    },

    {
        path: '/checkout/:id',
        component: <CheckOut />,
    },

    {
        path: '/blog/:id',
        component: <DetailBlog />,
    },

    {
        path: '/admin',
        component: <Dashboard />,
    },

    {
        path: '/notfound',
        component: <NotFoundPage />,
    },

    {
        path: '/forgot-password',
        component: <ForgotPassword />,
    },

    {
        path: '*',
        component: <NotFoundPage />,
    },
];

export { publicRoutes };
