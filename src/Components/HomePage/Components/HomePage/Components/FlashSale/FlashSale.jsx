import { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './FlashSale.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import { requestGetProductSale } from '../../../../../../config/config';

import CardBody from '../../../../../CardBody/CardBody';
import { useTheme } from '../../../../../../store/Provider';

const cx = classNames.bind(styles);

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
};

function FlashSale() {
    const [dataProducts, setDataProducts] = useState([]);
    const targetDate = new Date(dataProducts[0]?.dateEnd).getTime();
    const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

    const { mode } = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetProductSale();
            setDataProducts(res);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const newTimeLeft = targetDate - Date.now();
            setTimeLeft((prev) => (prev !== newTimeLeft ? newTimeLeft : prev));
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const time = useMemo(() => {
        const totalSeconds = Math.floor(timeLeft / 1000);
        return {
            days: Math.floor(totalSeconds / 86400),
            hours: Math.floor((totalSeconds % 86400) / 3600),
            minutes: Math.floor((totalSeconds % 3600) / 60),
            seconds: totalSeconds % 60,
        };
    }, [timeLeft]);

    return (
        <>
            {dataProducts.length > 0 && (
                <div className={cx(mode === 'dark' ? 'wrapper' : 'wrapper__light')}>
                    <div className={cx('header')}>
                        <h4>Flash Sale</h4>
                        <div className={cx('header__time__sale')}>
                            <span className={cx('time-box')}>{time.days} Ngày</span>
                            <FontAwesomeIcon id={cx('icon')} icon={faEllipsisVertical} />
                            <span className={cx('time-box')}>{time.hours} Giờ</span>
                            <FontAwesomeIcon id={cx('icon')} icon={faEllipsisVertical} />
                            <span className={cx('time-box')}>{time.minutes} Phút</span>
                            <FontAwesomeIcon id={cx('icon')} icon={faEllipsisVertical} />
                            <span className={cx('time-box')}>{time.seconds} Giây</span>
                        </div>
                    </div>

                    <div className={cx('main__list__products')}>
                        <Slider {...settings}>
                            {dataProducts.map((product) => (
                                <div key={product._id} className={cx('card')}>
                                    <Link to={`/product/${product._id}`}>
                                        <CardBody product={product} />
                                    </Link>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            )}
        </>
    );
}

export default FlashSale;
