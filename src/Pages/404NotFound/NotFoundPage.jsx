import classNames from 'classnames/bind';
import styles from './NotFoundPage.module.scss';
import Header from '../../Components/Header/Header';

import Button from '@mui/material/Button';

import imgNotFound from '/public/images/notfount.png';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function NotFoundPage() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Không tìm thấy trang yêu cầu | 404 Error ';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx('main')}>
                <img src={imgNotFound} alt="404" />
                <p>Trang bạn đang tìm kiếm không tồn tại</p>
                <Button
                    onClick={() => {
                        navigate('/');
                    }}
                    fullWidth
                    variant="contained"
                >
                    Tiếp tục mua sắm
                </Button>
            </main>
        </div>
    );
}

export default NotFoundPage;
