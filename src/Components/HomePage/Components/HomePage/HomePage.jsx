import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';

import Slider from 'react-slick';
import HomeCardBody from './Components/HomeCardBody/HomeCardBody';
import { useTheme } from '../../../../store/Provider';

const cx = classNames.bind(styles);

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
};

function HomePage({ products }) {
    const { mode } = useTheme();

    return (
        <div className={cx('wrapper')}>
            <Slider className={cx(mode === 'dark' ? 'slider__dark' : 'slider')} {...settings}>
                <div className={cx('slide')}>
                    <img
                        src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/cf/29/6b/a7159437f6c399d2101af4ce07244707.png.webp"
                        alt=""
                    />
                </div>
                <div className={cx('slide')}>
                    <img
                        src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/1b/5f/d2/2927a3714421257a49322375d4b7769e.png.webp"
                        alt=""
                    />
                </div>
                <div className={cx('slide')}>
                    <img
                        src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/5a/75/0d/fa2fe7a46990ec527a6ba3b2875f1957.png.webp"
                        alt=""
                    />
                </div>
                <div className={cx('slide')}>
                    <img
                        src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/c4/0b/8e/d78eb26956e0fe454ffebe2e2df9b830.png.webp"
                        alt=""
                    />
                </div>
            </Slider>
            <div className={cx(mode === 'dark' ? 'home-card-body__dark' : 'home-card-body')}>
                <HomeCardBody products={products} />
            </div>
        </div>
    );
}

export default HomePage;
