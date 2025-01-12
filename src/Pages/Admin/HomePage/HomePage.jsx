import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import AddProduct from './Components/Products/AddProduct/AddProduct';

const cx = classNames.bind(styles);

function HomePage() {
    return (
        <div>
            <AddProduct />
        </div>
    );
}

export default HomePage;
