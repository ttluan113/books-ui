import classNames from 'classnames/bind';
import styles from './CheckOut.module.scss';

import Header from '../../Components/Header/Header';
import imgSuccess from '../../../public/images/success.gif';

import { useEffect, useState } from 'react';
import { requestCheckout } from '../../config/config';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../store/Provider';

import SlideBarMobile from '../../Components/HomePage/Components/SlideBarMobile/SlideBarMobile';

const cx = classNames.bind(styles);

function CheckOut() {
    const [dataCheckout, setDataCheckout] = useState({});
    const [productsOrder, setProductsOrder] = useState([]);

    const { mode } = useTheme();

    const { id } = useParams();

    useEffect(() => {
        document.title = 'Kết quả thanh toán | L2 Book';
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestCheckout(id);
            setDataCheckout(res.payment);
            setProductsOrder(res.data);
        };
        fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx(mode === 'light' ? 'main' : 'main__dark')}>
                <div className={cx('success')}>
                    <img src={imgSuccess} alt="..." />
                    <h3>Cảm ơn bạn đã mua hàng tại L2 Book</h3>
                    <p>
                        Thanh toán thành công, hệ thống gửi xác nhận và biên lai ngay lập tức. Quá trình nhanh gọn,
                        khách hàng hoàn toàn yên tâm.
                    </p>
                    <div className={cx('list')}>
                        <span>Địa chỉ</span>
                        <p>{dataCheckout.address}</p>
                    </div>

                    <div className={cx('list')}>
                        <span>Số điện thoại</span>
                        <p>0{dataCheckout.phone}</p>
                    </div>

                    <div className={cx('list')}>
                        <span>Kiểu thanh toán</span>
                        <p>{dataCheckout.typePayments}</p>
                    </div>

                    <div className={cx('list__products')}>
                        <ul>
                            {productsOrder.map((item) => (
                                <li key={item._id}>
                                    <div id={cx('product')}>
                                        <img
                                            src={`${import.meta.env.VITE_URL_IMAGE}/uploads/products/${
                                                item?.images[0]
                                            }`}
                                            alt=""
                                        />
                                        <h4>{item.name}</h4>
                                    </div>
                                    <p id={cx('price')}>Số lượng : x{item.quantityUserBuy} </p>
                                    <p id={cx('price')}>{item.price.toLocaleString()} đ</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
            <div>
                <SlideBarMobile />
            </div>
        </div>
    );
}

export default CheckOut;
