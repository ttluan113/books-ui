import classNames from 'classnames/bind';
import styles from './HistoryOrder.module.scss';

import { useState } from 'react';
import OrderProcessing from './Components/OrderProcessing';
import { ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

const listHeader = [
    { name: 'Đang xử lý', params: 'pending' },
    { name: 'Đã xác nhận', params: 'completed' },
    { name: 'Đang vận chuyển', params: 'shipping' },
    { name: 'Đã giao', params: 'delivered' },
    { name: 'Đã huỷ', params: 'cancelled' },
];

function HistoryOrder() {
    const [type, setType] = useState(0);
    const [params, setParams] = useState('pending');

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <h4>Đơn hàng của tôi</h4>
            <div className={cx('header__history')}>
                {listHeader.map((item, index) => (
                    <div
                        onClick={() => {
                            setType(index);
                            setParams(item.params);
                        }}
                        className={cx('header__history__item')}
                        key={index}
                    >
                        <p id={cx(type === index ? 'active' : '')}>{item.name}</p>
                    </div>
                ))}
            </div>

            <div className={cx('main__history')}>
                <OrderProcessing params={params} />
            </div>
        </div>
    );
}

export default HistoryOrder;
