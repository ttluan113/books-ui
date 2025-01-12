import classNames from 'classnames/bind';
import styles from './index.module.scss';
import SlideBar from './Components/SlideBar/SlideBar';
import HomePage from './Components/HomePage/HomePage';
import { useEffect, useState } from 'react';
import { requestGetProducts } from '../../config/config';

const cx = classNames.bind(styles);

function IndexHomePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetProducts();
            setProducts(res);
        };
        fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide-bar')}>
                <SlideBar />
            </div>

            <div>
                <HomePage products={products} />
            </div>
        </div>
    );
}

export default IndexHomePage;
