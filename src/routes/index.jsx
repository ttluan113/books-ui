import App from '../App';
import Cart from '../Pages/Cart/Cart';
import DetailProduct from '../Pages/DetailProduct/DetailProduct';
import LoginUser from '../Pages/Login/Login';
import Payments from '../Pages/Payments/Payments';
import RegisterUser from '../Pages/Register/Register';

const publicRoutes = [
    {
        path: '/',
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
];

const privateRoutes = {};

export { publicRoutes, privateRoutes };
