import classNames from 'classnames/bind';
import styles from './InfoUser.module.scss';

import Header from '../../Components/Header/Header';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { faGift, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Personal from './Components/Personal/Personal';
import HistoryOrder from './Components/HistoryOrder/HistoryOrder';

import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const listController = [
    { name: 'Thông tin tài khoản', icon: faUser, path: 'customer' },
    { name: 'Quản lý đơn hàng', icon: faGift, path: 'order' },
    { name: 'Đánh giá sản phẩm', icon: faEnvelope, path: 'review' },
    { name: 'Sản phẩm yêu thích', icon: faHeart, path: 'favorite' },
    { name: 'Sổ địa chỉ', icon: faLocationDot, path: 'address' },
];

function InfoUser() {
    const [type, setType] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Tài khoản của tôi';
        switch (window.location.pathname) {
            case '/customer':
                setType(0);
                break;
            case '/order':
                setType(1);
                break;
            default:
                break;
        }
    }, [window.location.pathname]);

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
                            {listController.map((item, index) => (
                                <li
                                    onClick={() => {
                                        navigate(`/${item.path}`);
                                        setType(index);
                                    }}
                                    key={index}
                                    className={cx('active__controller')}
                                >
                                    <FontAwesomeIcon id={cx('icon')} icon={item.icon} />
                                    <span>{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={cx('right')}>{type === 0 ? <Personal /> : <HistoryOrder />}</div>
            </main>
        </div>
    );
}

export default InfoUser;
