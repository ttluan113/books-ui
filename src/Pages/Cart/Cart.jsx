import className from 'classnames/bind';
import styles from './Cart.module.scss';

import Header from '../../Components/Header/Header';
import { useEffect } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import CardBody from '../../Components/CardBody/CardBody';
import Slider from 'react-slick';

const cx = className.bind(styles);

function Cart() {
    useEffect(() => {
        document.title = 'L2 Team | Giỏ Hàng';
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
    };

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx('main')}>
                <h4>Giỏ Hàng</h4>
                <div className={cx('cart')}>
                    <div>
                        <div className={cx('header-cart')}>
                            <div className={cx('header-cart__product')}>(2) Sản phẩm</div>
                            <div className={cx('header-cart__price')}>Đơn Giá</div>
                            <div className={cx('header-cart__quantity')}>Số lượng</div>
                            <div className={cx('header-cart__total')}>Thành tiền</div>
                        </div>

                        <div className={cx('cart-item')}>
                            <div className={cx('cart-item__product')}>
                                <div className={cx('cart-item__product-img')}>
                                    <img
                                        src="https://salt.tikicdn.com/cache/750x750/ts/product/20/15/db/3c50fc06da7b72d97358842f9b08cd71.jpg.webp"
                                        alt="product"
                                    />
                                    <h4>Nói Chuyện Là Bản Năng, Giữ Miệng Là Tu Dưỡng, Im Lặng Là Trí Tuệ</h4>
                                </div>
                                <div className={cx('cart-item__product-price')}>1.500.000 đ</div>
                                <div className={cx('cart-item__product-size')}>
                                    <button>-</button>
                                    <input value={1} type="number" />
                                    <button>+</button>
                                </div>
                                <div className={cx('cart-item__product-price')}>1.500.000 đ</div>
                                <div className={cx('cart-item__product-delete')}>
                                    <DeleteOutlineIcon />
                                </div>
                            </div>

                            <div className={cx('cart-item__product')}>
                                <div className={cx('cart-item__product-img')}>
                                    <img
                                        src="https://salt.tikicdn.com/cache/750x750/ts/product/20/15/db/3c50fc06da7b72d97358842f9b08cd71.jpg.webp"
                                        alt="product"
                                    />
                                    <h4>Nói Chuyện Là Bản Năng, Giữ Miệng Là Tu Dưỡng, Im Lặng Là Trí Tuệ</h4>
                                </div>
                                <div className={cx('cart-item__product-price')}>1.500.000 đ</div>
                                <div className={cx('cart-item__product-size')}>
                                    <button>-</button>
                                    <input value={1} type="number" />
                                    <button>+</button>
                                </div>
                                <div className={cx('cart-item__product-price')}>1.500.000 đ</div>
                                <div className={cx('cart-item__product-delete')}>
                                    <DeleteOutlineIcon />
                                </div>
                            </div>

                            <div className={cx('cart-item__product')}>
                                <div className={cx('cart-item__product-img')}>
                                    <img
                                        src="https://salt.tikicdn.com/cache/750x750/ts/product/20/15/db/3c50fc06da7b72d97358842f9b08cd71.jpg.webp"
                                        alt="product"
                                    />
                                    <h4>Nói Chuyện Là Bản Năng, Giữ Miệng Là Tu Dưỡng, Im Lặng Là Trí Tuệ</h4>
                                </div>
                                <div className={cx('cart-item__product-price')}>1.500.000 đ</div>
                                <div className={cx('cart-item__product-size')}>
                                    <button>-</button>
                                    <input value={1} type="number" />
                                    <button>+</button>
                                </div>
                                <div className={cx('cart-item__product-price')}>1.500.000 đ</div>
                                <div className={cx('cart-item__product-delete')}>
                                    <DeleteOutlineIcon />
                                </div>
                            </div>

                            <div className={cx('cart-item__product')}>
                                <div className={cx('cart-item__product-img')}>
                                    <img
                                        src="https://salt.tikicdn.com/cache/750x750/ts/product/20/15/db/3c50fc06da7b72d97358842f9b08cd71.jpg.webp"
                                        alt="product"
                                    />
                                    <h4>Nói Chuyện Là Bản Năng, Giữ Miệng Là Tu Dưỡng, Im Lặng Là Trí Tuệ</h4>
                                </div>
                                <div className={cx('cart-item__product-price')}>1.500.000 đ</div>
                                <div className={cx('cart-item__product-size')}>
                                    <button>-</button>
                                    <input value={1} type="number" />
                                    <button>+</button>
                                </div>
                                <div className={cx('cart-item__product-price')}>1.500.000 đ</div>
                                <div className={cx('cart-item__product-delete')}>
                                    <DeleteOutlineIcon />
                                </div>
                            </div>

                            <div className={cx('cart-item__product')}>
                                <div className={cx('cart-item__product-img')}>
                                    <img
                                        src="https://salt.tikicdn.com/cache/750x750/ts/product/20/15/db/3c50fc06da7b72d97358842f9b08cd71.jpg.webp"
                                        alt="product"
                                    />
                                    <h4>Nói Chuyện Là Bản Năng, Giữ Miệng Là Tu Dưỡng, Im Lặng Là Trí Tuệ</h4>
                                </div>
                                <div className={cx('cart-item__product-price')}>1.500.000 đ</div>
                                <div className={cx('cart-item__product-size')}>
                                    <button>-</button>
                                    <input value={1} type="number" />
                                    <button>+</button>
                                </div>
                                <div className={cx('cart-item__product-price')}>1.500.000 đ</div>
                                <div className={cx('cart-item__product-delete')}>
                                    <DeleteOutlineIcon />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('sum-price')}>
                        <div className={cx('sum-price__total')}>
                            <h5 className={cx('title')}>Tổng tiền hàng</h5>
                            <span>15.000.000 đ</span>
                        </div>
                        <div className={cx('sum__price_discount')}>
                            <h5>Chọn mã giảm giá</h5>
                            <ul>
                                <li>
                                    <img
                                        src="https://salt.tikicdn.com/cache/128x128/ts/upload/b4/57/39/dde396bd53a086adf9d421877ad9259a.jpg"
                                        alt=""
                                    />
                                    <span>Giảm giá 1.500.000 đ</span>

                                    <input type="radio" />
                                </li>

                                <li>
                                    <img
                                        src="https://salt.tikicdn.com/cache/128x128/ts/upload/b4/57/39/dde396bd53a086adf9d421877ad9259a.jpg"
                                        alt=""
                                    />
                                    <span>Giảm giá 1.500.000 đ</span>

                                    <input type="radio" />
                                </li>

                                <li>
                                    <img
                                        src="https://salt.tikicdn.com/cache/128x128/ts/upload/b4/57/39/dde396bd53a086adf9d421877ad9259a.jpg"
                                        alt=""
                                    />
                                    <span>Giảm giá 1.500.000 đ</span>

                                    <input type="radio" />
                                </li>

                                <li>
                                    <img
                                        src="https://salt.tikicdn.com/cache/128x128/ts/upload/b4/57/39/dde396bd53a086adf9d421877ad9259a.jpg"
                                        alt=""
                                    />
                                    <span>Giảm giá 1.500.000 đ</span>

                                    <input type="radio" />
                                </li>

                                <li>
                                    <img
                                        src="https://salt.tikicdn.com/cache/128x128/ts/upload/b4/57/39/dde396bd53a086adf9d421877ad9259a.jpg"
                                        alt=""
                                    />
                                    <span>Giảm giá 1.500.000 đ</span>

                                    <input type="radio" />
                                </li>
                            </ul>
                        </div>
                        <div className={cx('sum-price__total')}>
                            <h5 className={cx('title')}>Tổng tiền thanh toán</h5>
                            <span>15.000.000 đ</span>
                        </div>

                        <div className={cx('btn-buy')}>
                            <button>Mua Hàng (2)</button>
                        </div>
                    </div>
                </div>
                <div className={cx('recommend')}>
                    <h4>Có thể bạn thích</h4>
                    <div>
                        <Slider {...settings}>
                            <div>
                                <CardBody />
                            </div>
                            <div>
                                <CardBody />
                            </div>
                            <div>
                                <CardBody />
                            </div>
                            <div>
                                <CardBody />
                            </div>
                            <div>
                                <CardBody />
                            </div>
                            <div>
                                <CardBody />
                            </div>
                            <div>
                                <CardBody />
                            </div>
                            <div>
                                <CardBody />
                            </div>
                            <div>
                                <CardBody />
                            </div>
                            <div>
                                <CardBody />
                            </div>
                        </Slider>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Cart;
