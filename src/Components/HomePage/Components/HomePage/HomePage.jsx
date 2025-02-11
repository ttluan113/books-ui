import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';

import HomeCardBody from './Components/HomeCardBody/HomeCardBody';
import { useTheme } from '../../../../store/Provider';

import { FastAverageColor } from 'fast-average-color';

import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Slider from 'react-slick';
import FlashSale from './Components/FlashSale/FlashSale';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { requestGetProductsTopBuy } from '../../../../config/config';
import PaginationPage from '../../../Pagination/Pagination';

const cx = classNames.bind(styles);

function HomePage({ dataProducts, pageProduct }) {
    const { mode } = useTheme();
    const bannerRef = useRef(null);

    const [indexProduct, setIndexProduct] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetProductsTopBuy();
            setProducts(res);
        };
        fetchData();
    }, []);

    const navigate = useNavigate();

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        beforeChange: (oldIndex, newIndex) => setIndexProduct(newIndex),
    };

    const [sortType, setSortType] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sort = params.get('sortType');
        if (sort) setSortType(sort);
    }, []);

    const handleChange = (event) => {
        const newSort = event.target.value;

        const searchParams = new URLSearchParams(window.location.search);

        searchParams.set('sortType', newSort);

        setSortType(newSort);
        navigate(`?${searchParams.toString()}`);
    };

    useEffect(() => {
        const fac = new FastAverageColor();
        const img = new Image();

        const image = products.map((product, index) => {
            if (index === indexProduct) {
                return `https://book.local2/uploads/products/${product?.images[0]}`;
            }
        });

        const filteredImages = image.filter((url) => typeof url === 'string' && url.startsWith('https://'));

        img.src = filteredImages[0];
        img.crossOrigin = 'anonymous';

        img.onload = () => {
            const color = fac.getColor(img) || { hex: '#000' };
            if (bannerRef.current) {
                bannerRef.current.style.background = `linear-gradient(-90deg, ${color.hex}, rgba(0, 0, 0, 0.05))`;
            }
        };
    }, [indexProduct, bannerRef]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('main__banner')}>
                <div className={cx('main__banner__title')}>
                    <h4>Sản phẩm bán chạy nhất</h4>
                </div>
                <div
                    ref={bannerRef}
                    className={cx(mode === 'light' ? 'main__banner__content' : 'main__banner__content__dark')}
                >
                    <Slider {...settings}>
                        {products.map((product, index) => (
                            <div key={product._id} className={cx('main__banner__content__info')}>
                                <ul>
                                    <li id={cx(index === indexProduct ? 'animation__li' : '')}>{product.name}</li>
                                    <li id={cx(index === indexProduct ? 'animation__li' : '')}>
                                        {product.options.company}
                                    </li>
                                    <li id={cx(index === indexProduct ? 'animation__li' : '')}>
                                        {product.options.publishingHouse}
                                    </li>
                                    <li id={cx(index === indexProduct ? 'animation__li' : '')}>
                                        {product.price.toLocaleString() + ' VNĐ'}
                                    </li>
                                    <li id={cx(index === indexProduct ? 'animation__li' : '')}>
                                        Còn lại {product.quantity} Sản phẩm
                                    </li>
                                    <li id={cx(index === indexProduct ? 'animation__li' : '')}>
                                        {product.countBuy}+ đã bán
                                    </li>
                                    <li
                                        onClick={() => {
                                            navigate(`/product/${product._id}`);
                                        }}
                                        className={cx(index === indexProduct && 'main__banner__content__info__btn')}
                                        id={cx(index === indexProduct ? 'animation__li' : '')}
                                    >
                                        Mua ngay
                                    </li>
                                </ul>
                                <img
                                    src={`${import.meta.env.VITE_URL_IMAGE}/uploads/products/${product?.images[0]}`}
                                    alt=""
                                    id={cx(index === indexProduct ? 'animation__img' : '')}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <div>
                <FlashSale />
            </div>
            <div className={cx(mode === 'light' ? 'sort__product' : 'sort__product__dark')}>
                <div>
                    <h4>Sắp xếp sản phẩm</h4>
                </div>
                <div className={cx('sort__product__content')}>
                    <div>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl size="small" fullWidth>
                                <InputLabel id="demo-simple-select-label">Sắp xếp</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sortType}
                                    label="Sắp xếp"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'top_buy'}>Mua nhiều nhất</MenuItem>
                                    <MenuItem value={'price_desc'}>Giá từ cao đến thấp</MenuItem>
                                    <MenuItem value={'price_asc'}>Giá từ thấp đến cao</MenuItem>
                                    <MenuItem value={'sale'}>Hàng giảm giá</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>
            </div>
            <div className={cx(mode === 'dark' ? 'home-card-body__dark' : 'home-card-body')}>
                {dataProducts && dataProducts.length > 0 ? (
                    <div>
                        <HomeCardBody products={dataProducts} />
                        <div className={cx('pagination')}>
                            <PaginationPage totalPages={pageProduct} />
                        </div>
                    </div>
                ) : (
                    <p className={cx('no-products')}>Không có sản phẩm nào!</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;
