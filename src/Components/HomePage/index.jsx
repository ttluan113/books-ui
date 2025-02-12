import classNames from 'classnames/bind';
import styles from './index.module.scss';
import SlideBar from './Components/SlideBar/SlideBar';
import HomePage from './Components/HomePage/HomePage';
import { useEffect, useState } from 'react';
import { requestGetProducts } from '../../config/config';

import { useSearchParams } from 'react-router-dom';
import Blogs from './Components/Blogs/Blogs';

const cx = classNames.bind(styles);

function IndexHomePage() {
    const [products, setProducts] = useState([]);

    const [searchParams] = useSearchParams();
    const [pageProduct, setPageProduct] = useState(1);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = {
                sortType: searchParams.get('sortType') || '',
                category: searchParams.get('category') || '',
                page: searchParams.get('page') || 1,
                limit: 15,
            };
            const res = await requestGetProducts(data);
            setProducts(res.data);
            setPageProduct(res.totalPages);
        };
        fetchData();
    }, [searchParams]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('side__bar')}>
                <div className={cx('slide-bar')}>
                    <SlideBar />
                </div>

                <div className={cx('blogs')}>
                    <Blogs />
                </div>
            </div>

            <div>
                <HomePage dataProducts={products} pageProduct={pageProduct} />
            </div>
        </div>
    );
}

export default IndexHomePage;
