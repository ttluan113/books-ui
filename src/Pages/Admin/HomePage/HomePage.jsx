import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import Message from './Components/Messages/Message';
import Order from './Components/Order/Order';
import HomeProducts from './Components/Product/HomeProducts';
import HomeDiscount from './Components/Discounts/HomeDiscount';
import Category from './Components/Category/Category';
import { useEffect } from 'react';
import DiscountProduct from './Components/DiscountProduct/DiscountProduct';
import ControllerUser from './Components/Users/User';
import Dashboard from './Components/Dashboard/Dashboard';
import Blog from './Components/Blog/Blog';

const cx = classNames.bind(styles);

function HomePage({ type }) {
    useEffect(() => {
        document.title = 'Trang chủ';
    }, []);

    return (
        <div>
            {type === 2 ? (
                <HomeProducts />
            ) : type === 3 ? (
                <HomeDiscount />
            ) : type === 6 ? (
                <Message />
            ) : type === 1 ? (
                <Order />
            ) : type === 7 ? (
                <Category />
            ) : type === 8 ? (
                <DiscountProduct />
            ) : type === 4 ? (
                <ControllerUser />
            ) : type === 0 ? (
                <Dashboard />
            ) : type === 5 ? (
                <Blog />
            ) : (
                <></>
            )}
        </div>
    );
}

export default HomePage;
