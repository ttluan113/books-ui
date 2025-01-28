import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import AddProduct from './Components/Product/AddProduct';
import AddDisCount from './Components/Discounts/AddDiscount';
import Message from './Components/Messages/Message';
import Order from './Components/Order/Order';

const cx = classNames.bind(styles);

function HomePage({ type }) {
    return (
        <div>
            {type === 2 ? (
                <AddProduct />
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
