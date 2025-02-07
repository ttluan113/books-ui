import App from '../App';
import Dashboard from '../Pages/Admin/Dashboard';
import Cart from '../Pages/Cart/Cart';
import CheckOut from '../Pages/checkout/CheckOut';
import DetailProduct from '../Pages/DetailProduct/DetailProduct';
import HistoryOrder from '../Pages/InfoUser/Components/HistoryOrder/HistoryOrder';
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
        path: '/admin',
        component: <Dashboard />,
    },
];

const privateRoutes = {};

export { publicRoutes, privateRoutes };
