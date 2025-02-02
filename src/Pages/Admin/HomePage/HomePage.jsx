import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import AddDisCount from './Components/Discounts/AddDiscount';
import Message from './Components/Messages/Message';
import Order from './Components/Order/Order';
import HomeProducts from './Components/Product/HomeProducts';

const cx = classNames.bind(styles);

function HomePage({ type }) {
    return (
        <div>
            {type === 2 ? (
                <HomeProducts />
            ) : type === 3 ? (
                <AddDisCount />
            ) : type === 6 ? (
                <Message />
            ) : type === 1 ? (
                <Order />
            ) : (
                <></>
            )}
        </div>
    );
}

export default HomePage;
