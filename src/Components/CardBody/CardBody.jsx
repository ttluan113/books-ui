import classNames from 'classnames/bind';
import styles from './CardBody.module.scss';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

import { useTheme } from '../../store/Provider';

const cx = classNames.bind(styles);

function CardBody({ product }) {
    const { mode } = useTheme();

    return (
        <div className={cx(mode === 'dark' ? 'wrapper__dark' : 'wrapper')}>
            <img src={`${import.meta.env.VITE_URL_IMAGE}/uploads/products/${product?.images[0]}`} alt="" />
            <div className={cx('content')}>
                <div className={cx('price__wrapper')}>
                    <span className={cx('price')}>{product?.price?.toLocaleString()} đ</span>
                    {product?.discount > 0 && <span className={cx('discount')}>-{product?.discount}%</span>}
                </div>
                <p>{product?.options?.company}</p>
                <h3>{product?.name}</h3>
                <Box className={cx('rating')}>
                    <Rating name="read-only" value={product.rating} readOnly size="small" />
                    <span className={cx('sold')}>Đã Bán {product?.countBuy}</span>
                </Box>
            </div>
        </div>
    );
}

export default CardBody;
