import classNames from 'classnames/bind';
import styles from './OrderProcessing.module.scss';

import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import { requestEditOrder, requestGetHistoryOrder } from '../../../../../config/config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import imgEmptyOrder from '../../../../../assets/empty-order.png';
import ModalFeedback from './modal/modalFeedback';

const cx = classNames.bind(styles);
function OrderProcessing({ params }) {
    const [dataOrder, setDataOrder] = useState([]);
    const [showModalFeedback, setShowModalFeedback] = useState(false);
    const [nameProduct, setNameProduct] = useState('');
    const [idOrder, setIdOrder] = useState('');

    const navigate = useNavigate();

    const fetchData = async () => {
        const res = await requestGetHistoryOrder({ params });
        setDataOrder(res);
    };

    useEffect(() => {
        document.title = 'Đơn hàng của tôi';
        fetchData();
    }, [params]);

    const handleCancelOrder = async (id) => {
        try {
            const res = await requestEditOrder({ idOrder: id, statusOrder: 'cancelled' });
            toast.success(res.message);
            await fetchData();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const onModalFeedback = (name) => {
        setShowModalFeedback(true);
        setNameProduct(name);
    };

    return (
        <div className={cx('wrapper')}>
            {dataOrder.length === 0 && (
                <div className={cx('empty-order')}>
                    <img src={imgEmptyOrder} alt="" />
                    <p>Chưa có đơn hàng</p>
                </div>
            )}
            {dataOrder.map((item) => (
                <div key={item._id} className={cx('item')}>
                    <div className={cx('item__header')}>
                        <img src={`${import.meta.env.VITE_URL_IMAGE}/uploads/products/${item?.images[0]}`} alt="" />
                        <div className={cx('item__info')}>
                            <h4>{item.name}</h4>
                            <p>Số lượng : x{item.quantity}</p>
                            <p>Tổng tiền : {item.total.toLocaleString()} VNĐ</p>
                            <p>Địa chỉ : {item.address}</p>
                            <p>Thanh toán : {item.typePayments}</p>
                        </div>
                    </div>
                    {!['shipping', 'delivered', 'cancelled'].includes(params) && (
                        <div className={cx('item__btn')}>
                            <Button variant="contained" onClick={() => handleCancelOrder(item._id)}>
                                Huỷ đơn hàng
                            </Button>
                        </div>
                    )}

                    {['cancelled'].includes(params) && (
                        <div className={cx('item__btn')}>
                            <Button
                                variant="contained"
                                onClick={() => navigate(`/products/${item.products.map((item) => item.productId)}`)}
                            >
                                Chi tiết sản phẩm
                            </Button>
                        </div>
                    )}

                    {['delivered'].includes(params) && (
                        <div className={cx('item__btn')}>
                            <Button
                                onClick={() => {
                                    onModalFeedback(item.name);
                                    // setIdOrder(item.products.map((product) => product.productId));
                                    setIdOrder(item.products[0].productId);
                                }}
                                variant="contained"
                            >
                                Đánh giá sản phẩm
                            </Button>
                        </div>
                    )}
                </div>
            ))}
            <ModalFeedback
                open={showModalFeedback}
                setOpen={setShowModalFeedback}
                nameProduct={nameProduct}
                idOrder={idOrder}
            />
        </div>
    );
}

export default OrderProcessing;
