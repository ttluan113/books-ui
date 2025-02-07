import classNames from 'classnames/bind';
import styles from './index.module.scss';
import SlideBar from './Components/SlideBar/SlideBar';
import HomePage from './Components/HomePage/HomePage';
import { useEffect, useState } from 'react';
import { requestGetProducts } from '../../config/config';

import { useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function IndexHomePage() {
    const [products, setProducts] = useState([]);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            const data = {
                sortType: searchParams.get('sortType') || '',
                category: searchParams.get('category') || '',
                page: searchParams.get('page') || 1,
                limit: 5,
            };
            const res = await requestGetProducts(data);
            setProducts(res);
        };
        fetchData();
    }, [searchParams]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide-bar')}>
                <SlideBar />
            </div>

            <div>
                <HomePage dataProducts={products} />
            </div>
        </div>
    );
}

export default IndexHomePage;
