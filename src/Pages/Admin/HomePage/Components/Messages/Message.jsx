import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import { requestGetMessages, requestGetMessage, requestCreateMessage } from '../../../../../config/config';
import { useStore } from '../../../../../hooks/useStore';
import TimeAgo from '../../../../../utils/TimeAgo';

import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

import { useEffect, useState, useRef } from 'react';

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
    const [listMessage, setListMessage] = useState([]);
    const [idUserMessages, setIdUserMessages] = useState('');
    const [infoUserMessage, setInfoUserMessage] = useState({});

    const [valueMessage, setValueMessage] = useState('');

    const { dataUser, newMessage, newUserMessage } = useStore();

    const divRef = useRef(null);

    useEffect(() => {
        document.title = 'Tin nhắn';

        const fetchData = async () => {
            const res = await requestGetMessages();
            setDataMessage(res);
            if (res.length > 0) {
                setIdUserMessages(res.map((user) => user._id)[0]);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetMessage(idUserMessages);
            setListMessage(res);
            setInfoUserMessage(res[0]);
        };
        if (idUserMessages === '') return;
        fetchData();
    }, [idUserMessages]);

    useEffect(() => {
        if (newUserMessage) {
            setDataMessage([...dataMessage, newUserMessage]);
        }
    }, [newUserMessage]);

    const handleCreateMessage = async () => {
        try {
            if (!valueMessage || !idUserMessages) return;
            const data = {
                valueMessage,
                receiverId: idUserMessages,
            };

            const res = await requestCreateMessage(data);
            setListMessage([...listMessage, res]);
            setValueMessage('');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (newMessage) {
            setListMessage((prev) => [...prev, newMessage]);
            setTimeout(() => {
                divRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 100);
        }
    }, [newMessage]);

    useEffect(() => {
        divRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [listMessage]);

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
                                    <Avatar
                                        alt={user?.fullName}
                                        src={`${import.meta.env.VITE_URL_IMAGE}/uploads/avatars/${user.avatar}`}
                                    />
                                </StyledBadge>

                                <h4>{user?.fullName}</h4>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {idUserMessages && (
                <div className={cx('home__page')}>
                    <div className={cx('header__home__page')}>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar
                                alt={infoUserMessage?.fullName}
                                src={`${import.meta.env.VITE_URL_IMAGE}/uploads/avatars/${infoUserMessage?.avatar}`}
                            />
                        </StyledBadge>

                        <h4>{infoUserMessage?.fullName}</h4>
                    </div>
                    <div className={cx('main__home__page')}>
                        <div className={cx('list__message')}>
                            {listMessage.map((msg, index) => (
                                <div
                                    key={msg._id}
                                    ref={index === listMessage.length - 1 ? divRef : null} // Đặt ref vào tin nhắn cuối cùng
                                    className={cx('message__receive', { bgr__msg: msg.senderId === dataUser._id })}
                                >
                                    <p>{msg.content}</p>
                                    <span>
                                        <TimeAgo createdAt={msg.createdAt} />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={cx('footer__home__page')}>
                        <input
                            type="text"
                            placeholder="Nhập tin nhắn..."
                            onChange={(e) => setValueMessage(e.target.value)}
                            value={valueMessage}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleCreateMessage();
                                }
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Message;
