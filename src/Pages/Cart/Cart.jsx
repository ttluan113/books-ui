import className from 'classnames/bind';
import styles from './Cart.module.scss';

import Header from '../../Components/Header/Header';
import { useEffect, useState, useMemo, useCallback } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import {
    requestAddUserDiscount,
    requestDeleteCart,
    requestDeleteProductCart,
    requestGetCarts,
} from '../../config/config';
import cartEmpty from '../../../public/images/cartEmpty.png';
import { useTheme } from '../../store/Provider';
import imgDiscount from '/public/images/coupon.png';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { useStore } from '../../hooks/useStore';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

function Cart() {
    const [carts, setCarts] = useState([]);
    const [dataDiscount, setDataDiscount] = useState([]);
    const [totalCart, setTotalCart] = useState(0);

    const { dataUser, getCart } = useStore();
    const { mode } = useTheme();

    // Fetch cart data
    const fetchData = useCallback(async () => {
        try {
            const res = await requestGetCarts();
            setCarts(res.data || []);
            setTotalCart(res.total);
            setDataDiscount(res.discount);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        document.title = 'L2 Team | Giỏ Hàng';
        fetchData();
    }, [fetchData]);

    // Computed values
    const defaultPrice = useMemo(
        () => carts.reduce((total, item) => total + item.price * item.quantityUserBuy, 0),
        [carts],
    );

    const totalDiscount = useMemo(() => totalCart - defaultPrice, [totalCart, defaultPrice]);

    // Handlers
    const handleDeleteProductCart = useCallback(
        async (id) => {
            try {
                await requestDeleteProductCart(id);
                await getCart();
                fetchData();
            } catch (error) {
                toast.error(error.response.data.message);
            }
        },
        [fetchData],
    );

    const handleDeleteCart = useCallback(async () => {
        try {
            await requestDeleteCart();
            await getCart();
            await fetchData();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }, [fetchData]);

    const handleAddUserDiscount = useCallback(
        async (idDiscount) => {
            try {
                const res = await requestAddUserDiscount(idDiscount);
                fetchData();
                toast.success(res.message);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        },
        [fetchData],
    );

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <header>
                <Header />
            </header>

            <main className={cx(mode === 'dark' ? 'main__dark' : 'main')}>
                <h4>Giỏ Hàng</h4>
                <div className={cx(carts.length > 0 ? 'cart' : 'cart__empty')}>
                    {carts.length > 0 ? (
                        <div>
                            <div className={cx(mode === 'dark' ? 'header-cart__dark' : 'header-cart')}>
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
                                    <div
                                        key={cart.id}
                                        className={cx(
                                            mode === 'dark' ? 'cart-item__product__dark' : 'cart-item__product',
                                        )}
                                    >
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
                                            {(cart.price * cart.quantityUserBuy).toLocaleString()} đ
                                        </div>
                                        <div className={cx('cart-item__product-delete')}>
                                            <DeleteOutlineIcon onClick={() => handleDeleteProductCart(cart.id)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className={cx(mode === 'dark' ? 'cart-empty__dark' : 'cart-empty')}>
                            <img src={cartEmpty} />
                            <h4>Giỏ hàng trống</h4>
                            <p>Bạn tham khảo thêm các sản phẩm được L2 Team gợi ý bên dưới nhé!</p>
                        </div>
                    )}
                    {carts.length > 0 && (
                        <div className={cx(mode === 'dark' ? 'sum-price__dark' : 'sum-price')}>
                            <div className={cx('sum__price_discount')}>
                                <h5>Chọn mã giảm giá</h5>
                                <ul>
                                    {dataDiscount.map((discount) => (
                                        <li key={discount._id}>
                                            <div className={cx('title-discount')}>
                                                <img src={imgDiscount} alt="" />
                                                <p>
                                                    Giảm giá {discount.discount_percent}% cho đơn hàng tối thiểu{' '}
                                                    {discount.discount_min_value_order.toLocaleString()} đ
                                                </p>
                                            </div>

                                            <Button
                                                onClick={() => handleAddUserDiscount(discount._id)}
                                                sx={{ width: '28%' }}
                                                size="small"
                                                variant="contained"
                                                disabled={
                                                    discount.discount_user_used.includes(dataUser._id) ||
                                                    defaultPrice < discount.discount_min_value_order
                                                }
                                            >
                                                {discount.discount_user_used.includes(dataUser._id)
                                                    ? 'Đã áp dụng'
                                                    : 'Áp dụng'}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={cx('sum-price__total')}>
                                <h5 className={cx('title')}>Giảm giá</h5>
                                <span>{totalDiscount.toLocaleString()} đ</span>
                            </div>

                            <div className={cx('sum-price__total')}>
                                <h5 className={cx('title')}>Tổng tiền thanh toán</h5>
                                <span>{totalCart.toLocaleString()} đ</span>
                            </div>

                            <div className={cx('btn-buy')}>
                                <Link to="/payments">
                                    <button>Mua Hàng ({carts.length})</button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Cart;
