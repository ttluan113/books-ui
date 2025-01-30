import classNames from 'classnames/bind';
import styles from './Messenger.module.scss';

import { useState } from 'react';

const cx = classNames.bind(styles);

function Messenger() {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <img src="https://book.local2/public/images/logo.webp" alt="" />
                <h4>Hỗ trợ trực tuyến</h4>
            </header>

            <main className={cx('main')}></main>

            <footer className={cx('footer')}>
                <input placeholder="Nhập tin nhắn..." />
            </footer>
        </div>
    );
}

export default Messenger;
