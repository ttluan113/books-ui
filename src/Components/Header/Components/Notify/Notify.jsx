import classNames from 'classnames/bind';
import styles from './Notify.module.scss';

import Tooltip from '@mui/material/Tooltip';

import TimeAgo from '../../../../utils/TimeAgo';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { useStore } from '../../../../hooks/useStore';
import { requestReadAllNotify } from '../../../../config/config';

import { useTheme } from '../../../../store/Provider';

import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Notify() {
    const [showNotify, setShowNotify] = useState(false);

    const { dataNotify, getNotify } = useStore();

    const { mode } = useTheme();

    const navigate = useNavigate();

    const handleReadAllNotify = async () => {
        try {
            await requestReadAllNotify();
            await getNotify();
        } catch (error) {
            console.log(error);
        }
    };

    const onNavigateProduct = (path) => {
        navigate(path);
    };

    return (
        <div className={'wrapper'}>
            <div className={cx('notify')}>
                <div className={cx(mode === 'dark' ? 'number__notify__dark' : 'number__notify')}>
                    {dataNotify.filter((notify) => !notify.isRead).length}
                </div>
                <button onClick={() => setShowNotify(!showNotify)}>
                    <Tooltip title={!showNotify && 'Thông báo'}>
                        <FontAwesomeIcon
                            id={cx(mode === 'dark' ? 'icon__notify__dark' : 'icon__notify')}
                            icon={faBell}
                        />
                    </Tooltip>
                </button>

                {showNotify && (
                    <div className={cx(mode === 'dark' ? 'result__notify__dark' : 'result__notify')}>
                        <div className={cx('result__notify__header')}>
                            <h3>Thông Báo</h3>
                            <span onClick={handleReadAllNotify}>Đánh dấu tất cả đã đọc</span>
                        </div>
                        <div>
                            <ul>
                                {dataNotify
                                    .sort((a, b) => b.createdAt - a.createdAt)
                                    .map((notify) => (
                                        <li
                                            key={notify._id}
                                            onClick={() => onNavigateProduct(`/product/${notify.productId}`)}
                                            id={cx(notify.isRead ? '' : 'no__read')}
                                        >
                                            <img
                                                src={`${import.meta.env.VITE_URL_IMAGE}/uploads/avatars/${
                                                    notify.avatar
                                                }`}
                                                alt=""
                                            />
                                            <div className={cx('result__notify__info')}>
                                                <h4>{notify.fullName}</h4>
                                                <p>{notify.content}</p>
                                                <span>
                                                    <TimeAgo createdAt={notify.createdAt} />
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Notify;
