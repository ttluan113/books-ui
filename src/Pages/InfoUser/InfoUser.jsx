import classNames from 'classnames/bind';
import styles from './InfoUser.module.scss';

import Header from '../../Components/Header/Header';

import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { faGift, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Personal from './Components/Personal/Personal';

const cx = classNames.bind(styles);

function InfoUser() {
    useEffect(() => {
        document.title = 'L2 Team | Tài khoản của tôi';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx('main')}>
                <div className={cx('left')}>
                    <div className={cx('left__header__user')}>
                        <img src="https://salt.tikicdn.com/desktop/img/avatar.png" alt="" />
                        <div className={cx('left__header__user__info')}>
                            <p>Tài khoản của</p>
                            <span>Trần Trọng Luân</span>
                        </div>
                    </div>

                    <div className={cx('right__list__controller__user')}>
                        <ul>
                            <li className={cx('active__controller')}>
                                <FontAwesomeIcon id={cx('icon')} icon={faUser} />
                                <span>Thông tin tài khoản</span>
                            </li>

                            <li>
                                <FontAwesomeIcon id={cx('icon')} icon={faGift} />
                                <span>Quản lý đơn hàng</span>
                            </li>

                            <li>
                                <FontAwesomeIcon id={cx('icon')} icon={faEnvelope} />
                                <span>Đánh giá sản phẩm</span>
                            </li>

                            <li>
                                <FontAwesomeIcon id={cx('icon')} icon={faHeart} />
                                <span>Sản phẩm yêu thích</span>
                            </li>

                            <li>
                                <FontAwesomeIcon id={cx('icon')} icon={faLocationDot} />
                                <span>Sổ địa chỉ</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('right')}>
                    <Personal />
                </div>
            </main>
        </div>
    );
}

export default InfoUser;
