import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import AddProduct from './Components/Product/AddProduct';
import AddDisCount from './Components/Discounts/AddDiscount';

const cx = classNames.bind(styles);

function HomePage({ type }) {
    return <div>{type === 2 ? <AddProduct /> : type === 3 ? <AddDisCount /> : <></>}</div>;
}

export default HomePage;
