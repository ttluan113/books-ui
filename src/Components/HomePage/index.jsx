import classNames from 'classnames/bind';
import styles from './index.module.scss';
import SlideBar from './Components/SlideBar/SlideBar';
import HomePage from './Components/HomePage/HomePage';
import { useEffect, useState } from 'react';
import { requestGetCategory, requestGetProducts } from '../../config/config';

import { useSearchParams } from 'react-router-dom';
import Blogs from './Components/Blogs/Blogs';
import SlideBarMobile from './Components/SlideBarMobile/SlideBarMobile';

const cx = classNames.bind(styles);

function IndexHomePage() {
    const [products, setProducts] = useState([]);

    const [searchParams] = useSearchParams();
    const [pageProduct, setPageProduct] = useState(1);

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

    const [dataCategory, setDataCategory] = useState([]);

    const fetchData = async () => {
        const res = await requestGetCategory('');
        setDataCategory(res);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('side__bar')}>
                <div className={cx('slide-bar')}>
                    <SlideBar dataCategory={dataCategory} />
                </div>

                <div className={cx('blogs')}>
                    <Blogs />
                </div>
            </div>
            <div className={cx('slide__bar__mobile')}>
                <SlideBarMobile dataCategory={dataCategory} />
            </div>

            <div>
                <HomePage dataProducts={products} pageProduct={pageProduct} />
            </div>
        </div>
    );
}

export default IndexHomePage;
