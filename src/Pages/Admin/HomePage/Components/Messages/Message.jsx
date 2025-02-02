import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import { requestGetMessage } from '../../../../../config/config';

import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

function Message() {
    const [dataMessage, setDataMessage] = useState([]);
    const [idUserMessages, setIdUserMessages] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetMessage();
            setDataMessage(res);
        };
        fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide__bar')}>
                <h4>Tin Nhắn</h4>

                <div className={cx('list__user')}>
                    <ul>
                        {dataMessage.map((user) => (
                            <li
                                onClick={() => setIdUserMessages(user._id)}
                                key={user._id}
                                id={cx(idUserMessages == user._id && 'active')}
                            >
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <Avatar alt={user.fullName} src="/static/images/avatar/1.jpg" />
                                </StyledBadge>

                                <h4>{user.fullName}</h4>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={cx('home__page')}>
                <div className={cx('header__home__page')}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </StyledBadge>

                    <h4>Trần Trọng Luân</h4>
                </div>
                <div className={cx('main__home__page')}>
                    <div className={cx('list__message')}>
                        <div className={cx('message__receive')}>
                            <p>Chương trình với L2 Team</p>
                            <span>12:00</span>
                        </div>

                        <div className={cx('message__sender')}>
                            <p>Chương trình với L2 Team</p>
                            <span>12:00</span>
                        </div>

                        <div className={cx('message__receive')}>
                            <p>Chương trình với L2 Team</p>
                            <span>12:00</span>
                        </div>

                        <div className={cx('message__sender')}>
                            <p>Chương trình với L2 Team</p>
                            <span>12:00</span>
                        </div>

                        <div className={cx('message__receive')}>
                            <p>Chương trình với L2 Team</p>
                            <span>12:00</span>
                        </div>

                        <div className={cx('message__sender')}>
                            <p>Chương trình với L2 Team</p>
                            <span>12:00</span>
                        </div>

                        <div className={cx('message__receive')}>
                            <p>Chương trình với L2 Team</p>
                            <span>12:00</span>
                        </div>

                        <div className={cx('message__sender')}>
                            <p>Chương trình với L2 Team</p>
                            <span>12:00</span>
                        </div>

                        <div className={cx('message__receive')}>
                            <p>Chương trình với L2 Team</p>
                            <span>12:00</span>
                        </div>

                        <div className={cx('message__sender')}>
                            <p>Chương trình với L2 Team</p>
                            <span>12:00</span>
                        </div>

                        <div className={cx('message__sender')}>
                            <p>Chương trình với L2 Team</p>
                            <span>12:00</span>
                        </div>

                        <div className={cx('message__sender')}>
                            <p>Chương trình với L2 Team</p>
                            <span>12:00</span>
                        </div>

                        <div className={cx('message__sender')}>
                            <p>Chương trình với L2 Team</p>
                            <span>12:00</span>
                        </div>
                    </div>
                </div>
                <div className={cx('footer__home__page')}>
                    <input type="text" placeholder="Nhập tin nhắn..." />
                </div>
            </div>
        </div>
    );
}

export default Message;
