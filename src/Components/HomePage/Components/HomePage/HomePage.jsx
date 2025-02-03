import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';

import HomeCardBody from './Components/HomeCardBody/HomeCardBody';
import { useTheme } from '../../../../store/Provider';

import { FastAverageColor } from 'fast-average-color';

// import banner1 from '../../../../assets/book1.png';
import banner1 from '../../../../assets/1.webp';
import banner2 from '../../../../assets/3.webp';

import { useEffect, useRef, useState } from 'react';
import { requestGetProducts } from '../../../../config/config';

import Slider from 'react-slick';

const cx = classNames.bind(styles);

const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
};

function HomePage({ products }) {
    const { mode } = useTheme();
    const bannerRef = useRef(null);

    useEffect(() => {
        const fac = new FastAverageColor();
        const img = new Image();
        img.src = banner2;
        img.crossOrigin = 'anonymous'; // Đảm bảo có thể đọc ảnh từ nguồn ngoài

        img.onload = () => {
            const color = fac.getColor(img);
            if (bannerRef.current) {
                bannerRef.current.style.background = `linear-gradient(-90deg, ${color.hex}, rgba(0, 0, 0, 0.1))`;
            }
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div ref={bannerRef} className={cx('main__banner')}>
                <div className={cx('main__banner__content')}>
                    <div className={cx('main__banner__content__info')}>
                        <ul>
                            <li>123</li>
                            <li>Nhà Xuất Bản Công Thương</li>
                            <li>Bìa mềm</li>
                            <li>1980 Books</li>
                            <li>13 x 20,5 cm</li>
                            <li>60+ đã bán</li>
                        </ul>
                        <img src={banner2} alt="" />
                    </div>
                </div>
            </div>
            <div className={cx(mode === 'dark' ? 'home-card-body__dark' : 'home-card-body')}>
                {products && products.length > 0 ? (
                    <HomeCardBody products={products} />
                ) : (
                    <p className={cx('no-products')}>Không có sản phẩm nào!</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;
