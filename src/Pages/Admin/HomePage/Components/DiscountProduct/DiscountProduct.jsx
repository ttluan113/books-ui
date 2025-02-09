import classNames from 'classnames/bind';
import styles from './DiscountProduct.module.scss';

import Button from '@mui/material/Button';
import ModalAddDiscount from './ModalAddDiscount/ModalAddDiscount';

import { ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function DiscountProduct() {
    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div className={cx('header')}>
                <h4>Giảm giá sản phẩm</h4>
                <Button variant="contained">Thêm giảm giá</Button>
            </div>

            <ModalAddDiscount />
        </div>
    );
}

export default DiscountProduct;
