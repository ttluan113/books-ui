import className from 'classnames/bind';
import styles from './Cart.module.scss';

import Header from '../../Components/Header/Header';
import { useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import CardBody from '../../Components/CardBody/CardBody';
import Slider from 'react-slick';
import { requestDeleteCart, requestDeleteProductCart, requestGetCarts } from '../../config/config';
import cartEmpty from '../../../public/images/cartEmpty.png';

const cx = className.bind(styles);

function Cart() {
    const [carts, setCarts] = useState([]);
    const [sumPrice, setSumPrice] = useState(0);

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

    const fetchData = async () => {
        const res = await requestGetCarts();
        setCarts(res);
        const total = res.reduce((total, item) => total + item.price * item.quantityUserBuy, 0);
        setSumPrice(total);
    };

    useEffect(() => {
        try {
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const totalPrice = (price, quantity) => {
        return price * quantity;
    };

    const handleDeleteProductCart = async (id) => {
        try {
            await requestDeleteProductCart(id);
            await fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteCart = async () => {
        try {
            await requestDeleteCart();
            await fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx('main')}>
                <h4>Giỏ Hàng</h4>
                <div className={cx(carts.length > 0 ? 'cart' : 'cart__empty')}>
                    {carts.length > 0 ? (
                        <div>
                            <div className={cx('header-cart')}>
                                <div className={cx('header-cart__product')}>({carts.length}) Sản phẩm</div>
                                <div className={cx('header-cart__price')}>Đơn Giá</div>
                                <div className={cx('header-cart__quantity')}>Số lượng</div>
                                <div className={cx('header-cart__total')}>Thành tiền</div>
                                <div className={cx('cart-item__product-delete')}>
                                    <DeleteOutlineIcon onClick={handleDeleteCart} />
                                </div>
                            </div>

                            <div className={cx('cart-item')}>
                                {carts.map((cart) => (
                                    <div className={cx('cart-item__product')}>
                                        <div className={cx('cart-item__product-img')}>
                                            <img
                                                src={`${import.meta.env.VITE_URL_IMAGE}/uploads/products/${
                                                    cart?.images[0]
                                                }`}
                                                alt="product"
                                            />
                                            <h4>{cart?.name}</h4>
                                        </div>
                                        <div className={cx('cart-item__product-price')}>
                                            {cart?.price.toLocaleString()} đ
                                        </div>
                                        <div className={cx('cart-item__product-size')}>
                                            <span>x {cart.quantityUserBuy} Sản phẩm</span>
                                        </div>
                                        <div className={cx('cart-item__product-price')}>
                                            {totalPrice(cart?.price, cart?.quantityUserBuy).toLocaleString()} đ
                                        </div>
                                        <div className={cx('cart-item__product-delete')}>
                                            <DeleteOutlineIcon onClick={() => handleDeleteProductCart(cart._id)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className={cx('cart-empty')}>
                            <img src={cartEmpty} />
                            <h4>Giỏ hàng trống</h4>
                            <p>Bạn tham khảo thêm các sản phẩm được L2 Team gợi ý bên dưới nhé!</p>
                        </div>
                    )}
                    {carts.length > 0 && (
                        <div className={cx('sum-price')}>
                            <div className={cx('sum-price__total')}>
                                <h5 className={cx('title')}>Tổng tiền hàng</h5>
                                <span>{sumPrice?.toLocaleString()} đ</span>
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
                                <h5 className={cx('title')}>Giảm giá </h5>
                                <span> - 15.000.000 đ</span>
                            </div>

                            <div className={cx('sum-price__total')}>
                                <h5 className={cx('title')}>Tổng tiền thanh toán</h5>
                                <span>15.000.000 đ</span>
                            </div>

                            <div className={cx('btn-buy')}>
                                <button>Mua Hàng ({carts.length})</button>
                            </div>
                        </div>
                    )}
                </div>
                {/* <div className={cx('recommend')}>
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
                </div> */}
            </main>
        </div>
    );
}

export default Cart;
