import classNames from 'classnames/bind';
import styles from './SlideBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog, faCartPlus, faChartLine, faFile, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function SlideBar({}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('controller')}>
                <ul>
                    <li id={cx('active')}>
                        <FontAwesomeIcon id={cx('icons')} icon={faHome} />
                        <h5>Trang Chủ</h5>
                    </li>

                    <li>
                        <FontAwesomeIcon id={cx('icons')} icon={faFile} />
                        <h5> Đơn Hàng</h5>
                    </li>

                    <li>
                        <FontAwesomeIcon id={cx('icons')} icon={faCartPlus} />
                        <h5> Sản Phẩm</h5>
                    </li>

                    <li>
                        <FontAwesomeIcon id={cx('icons')} icon={faUser} />
                        <h5> Người Dùng</h5>
                    </li>

                    <li>
                        <FontAwesomeIcon id={cx('icons')} icon={faBlog} />
                        <h5> Bài Viết</h5>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SlideBar;
