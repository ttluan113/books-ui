import classNames from 'classnames/bind';
import styles from './CardBody.module.scss';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const cx = classNames.bind(styles);

function CardBody() {
    return (
        <div className={cx('wrapper')}>
            <img
                src="https://salt.tikicdn.com/cache/750x750/ts/product/20/15/db/3c50fc06da7b72d97358842f9b08cd71.jpg.webp"
                alt=""
            />
            <div className={cx('content')}>
                <span className={cx('price')}>100.000đ</span>
                <p>Nguyễn Anh Dũng</p>
                <h3>
                    Nói Chuyện Là Bản Năng, Giữ Miệng Là Tu Dưỡng, Im Lặng Là Trí TuệNói Chuyện Là Bản Năng, Giữ Miệng
                    Là Tu Dưỡng, Im Lặng Là Trí TuệNói Chuyện Là Bản Năng, Giữ Miệng Là Tu Dưỡng, Im Lặng Là Trí Tuệ
                </h3>
                <Box className={cx('rating')}>
                    <Rating name="read-only" value={5} readOnly size="small" />
                    <span className={cx('sold')}>Đã Bán 175</span>
                </Box>
            </div>
        </div>
    );
}

export default CardBody;
