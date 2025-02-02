import classNames from 'classnames/bind';
import styles from './Messenger.module.scss';
import imgAi from '../../../../assets/imgAi.png';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { requestCreateMessage, requestGetMessage } from '../../../../config/config';
import { useStore } from '../../../../hooks/useStore';

const cx = classNames.bind(styles);

function Messenger() {
    const { dataUser } = useStore();

    const [dataMessage, setDataMessage] = useState([]);

    const [valueMessage, setValueMessage] = useState('');

    const handleCreateMessage = async () => {
        try {
            if (!valueMessage) return;
            const res = await requestCreateMessage(valueMessage);
            setDataMessage([...dataMessage, res]);
            setValueMessage('');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetMessage();
            setDataMessage(res);
        };
        fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <div className={cx('header__left')}>
                    <img src={imgAi} alt="" />
                    <h4>Hỗ trợ cá nhân</h4>
                </div>
                <div className={cx('header__right')}>
                    <button>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
            </header>

            <main className={cx('main')}>
                <div className={cx('list__message')}>
                    {dataMessage.map((item) => (
                        <div key={item._id}>
                            {item.senderId === dataUser._id ? (
                                <div className={cx('message__item')}>
                                    <img src={'https://book.local2/public/images/logo.webp'} alt="" />
                                    <div className={cx('message__content__user')}>
                                        <p>{item.content}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className={cx('message__item')}>
                                    <img src={imgAi} alt="" />
                                    <div className={cx('message__content')}>
                                        <h5>Hỗ trợ cá nhân</h5>
                                        <p>{item.content}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            <footer className={cx('footer')}>
                <input
                    placeholder="Nhập tin nhắn..."
                    onChange={(e) => setValueMessage(e.target.value)}
                    value={valueMessage}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleCreateMessage();
                        }
                    }}
                />
            </footer>
        </div>
    );
}

export default Messenger;
