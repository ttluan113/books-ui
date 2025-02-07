import classNames from 'classnames/bind';
import styles from './Personal.module.scss';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faLock, faPhone, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

import { useStore } from '../../../../hooks/useStore';
import { useEffect, useState } from 'react';
import { requestEditUser } from '../../../../config/config';
import { toast, ToastContainer } from 'react-toastify';

import { useTheme } from '../../../../store/Provider';

const cx = classNames.bind(styles);

function Personal() {
    const { dataUser } = useStore();

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [image, setImage] = useState(null);

    const { mode } = useTheme();

    useEffect(() => {
        if (dataUser) {
            setFullName(dataUser.fullName);
            setPhone(dataUser.phone);
            setEmail(dataUser.email);
        }
    }, [dataUser]);

    const handlePreviewImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreviewImage(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        }
    };

    const handleEditUser = async () => {
        const form = new FormData();
        form.append('fullName', fullName);
        form.append('phone', phone);
        form.append('email', email);
        form.append('avatar', image);
        try {
            const res = await requestEditUser(form);
            toast.success(res.message);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <h4>Thông tin cá nhân</h4>
            <div className={cx('info')}>
                <div className={cx('user__avatar')}>
                    <img
                        src={previewImage || `${import.meta.env.VITE_URL_IMAGE}/uploads/avatars/${dataUser.avatar}`}
                        alt={dataUser?.fullName}
                    />

                    <input onChange={handlePreviewImage} type="file" id="file" style={{ display: 'none' }} />
                    <label htmlFor="file">
                        <FontAwesomeIcon id={cx(mode === 'dark' && 'icon')} icon={faCamera} />
                    </label>
                </div>

                <div className={cx('user__info')}>
                    <div className={cx('user__info__contact')}>
                        <div className={cx('user__info__item__contact__header')}>
                            <h4>Số điện thoại và Email</h4>
                            <div className={cx('user__info__item__contact')}>
                                <div className={cx('user__info__item__contact__1')}>
                                    <FontAwesomeIcon icon={faPhone} />
                                    <div className={cx('user__info__item__contact__1__info')}>
                                        <span>{`0${dataUser.phone}`}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('user__info__item__contact')}>
                                <div className={cx('user__info__item__contact__1')}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <div className={cx('user__info__item__contact__1__info')}>
                                        <span>{dataUser.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ paddingTop: '10px' }} className={cx('user__info__item__contact__header')}>
                            <h4>Bảo mật</h4>
                            <div className={cx('user__info__item__contact')}>
                                <div className={cx('user__info__item__contact__1')}>
                                    <FontAwesomeIcon icon={faLock} />
                                    <div className={cx('user__info__item__contact__1__info')}>
                                        <p>Đổi mật khẩu</p>
                                    </div>
                                </div>
                                <Button variant="outlined">Cập nhật</Button>
                            </div>

                            <div className={cx('user__info__item__contact')}>
                                <div className={cx('user__info__item__contact__1')}>
                                    <FontAwesomeIcon icon={faTrash} />
                                    <div className={cx('user__info__item__contact__1__info')}>
                                        <p>Yêu cầu xóa tài khoản</p>
                                    </div>
                                </div>
                                <Button variant="outlined">Yêu cầu</Button>
                            </div>
                        </div>
                    </div>

                    <div className={cx('user__info__item')}>
                        <TextField
                            value={fullName}
                            fullWidth
                            id="outlined-basic"
                            label="Họ và tên"
                            variant="outlined"
                            onChange={(e) => setFullName(e.target.value)}
                        />

                        <TextField
                            value={`0${phone}`}
                            fullWidth
                            id="outlined-basic"
                            label="Số điện thoại"
                            variant="outlined"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            value={'24/12/2024'}
                            label="Ngày đăng ký"
                            variant="outlined"
                            disabled
                        />
                        <Button onClick={handleEditUser} fullWidth variant="contained">
                            Lưu thay đổi
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Personal;
