import classNames from 'classnames/bind';
import styles from './SlideBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBlog,
    faCartPlus,
    faChartLine,
    faFile,
    faHome,
    faLayerGroup,
    faMessage,
    faTag,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function SlideBar({ setType, type }) {
    const onType = (index) => {
        setType(index);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('controller')}>
                <ul>
                    <li onClick={() => onType(0)} id={cx(type === 0 && 'active')}>
                        <FontAwesomeIcon id={cx('icons')} icon={faHome} />
                        <h5>Trang Chủ</h5>
                    </li>

                    <li onClick={() => onType(1)} id={cx(type === 1 && 'active')}>
                        <FontAwesomeIcon id={cx('icons')} icon={faFile} />
                        <h5> Đơn Hàng</h5>
                    </li>

                    <li onClick={() => onType(6)} id={cx(type === 6 && 'active')}>
                        <FontAwesomeIcon id={cx('icons')} icon={faMessage} />
                        <h5>Tin Nhắn</h5>
                    </li>

                    <li onClick={() => onType(2)} id={cx(type === 2 && 'active')}>
                        <FontAwesomeIcon id={cx('icons')} icon={faCartPlus} />
                        <h5>Sản Phẩm</h5>
                    </li>

                    <li onClick={() => onType(7)} id={cx(type === 7 && 'active')}>
                        <FontAwesomeIcon id={cx('icons')} icon={faLayerGroup} />
                        <h5>Danh mục</h5>
                    </li>

                    <li onClick={() => onType(3)} id={cx(type === 3 && 'active')}>
                        <FontAwesomeIcon id={cx('icons')} icon={faTag} />
                        <h5>Mã Giảm Giá</h5>
                    </li>

                    <li onClick={() => onType(8)} id={cx(type === 8 && 'active')}>
                        <FontAwesomeIcon id={cx('icons')} icon={faTag} />
                        <h5>Giảm Giá Sản Phẩm</h5>
                    </li>

                    <li onClick={() => onType(4)} id={cx(type === 4 && 'active')}>
                        <FontAwesomeIcon id={cx('icons')} icon={faUser} />
                        <h5> Người Dùng</h5>
                    </li>

                    <li onClick={() => onType(5)} id={cx(type === 5 && 'active')}>
                        <FontAwesomeIcon id={cx('icons')} icon={faBlog} />
                        <h5> Bài Viết</h5>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SlideBar;
