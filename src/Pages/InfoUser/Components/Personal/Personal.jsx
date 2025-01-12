import classNames from 'classnames/bind';
import styles from './Personal.module.scss';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPhone, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

import { useStore } from '../../../../hooks/useStore';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Personal() {
    const dataUser = useStore();

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [dateRegister, setDateRegister] = useState('');

    useEffect(() => {
        if (dataUser) {
            setFullName(dataUser.fullName);
            setPhone(dataUser.phone);
            setEmail(dataUser.email);
        }
    }, [dataUser]);

    return (
        <div className={cx('wrapper')}>
            <h4>Thông tin cá nhân</h4>
            <div className={cx('info')}>
                <div className={cx('user__avatar')}>
                    <img
                        src="https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/468635100_2030335600772187_8549397888606208782_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=4i0l7tJGlYkQ7kNvgG8SF1x&_nc_oc=AdjxM7_BD6oHPGnki5DHSjtVSaNXZ-Kit8Lx6mzvtCfqE08kG-msHgVri4I_rZ6wE2lMksScatVlNdA_BwUUi8Vg&_nc_zt=24&_nc_ht=scontent.fhan3-4.fna&_nc_gid=AZs6NpFZ6wjmK_D9vXSO805&oh=00_AYA4MzhE62btNFzyCuDTfCNJ9f8CuqEaPNSA15Zh9EYX2w&oe=676D5C0B"
                        alt=""
                    />
                </div>

                <div className={cx('user__info')}>
                    <div className={cx('user__info__item')}>
                        <TextField
                            value={fullName}
                            fullWidth
                            id="outlined-basic"
                            label="Họ và tên"
                            variant="outlined"
                        />
                        <TextField value={email} fullWidth id="outlined-basic" label="Email" variant="outlined" />
                        <TextField
                            value={`0${phone}`}
                            fullWidth
                            id="outlined-basic"
                            label="Số điện thoại"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            value={'24/12/2024'}
                            label="Ngày đăng ký"
                            variant="outlined"
                        />
                        <Button fullWidth variant="contained">
                            Lưu thay đổi
                        </Button>
                    </div>
                    <div className={cx('user__info__contact')}>
                        <div className={cx('user__info__item__contact__header')}>
                            <h4>Số điện thoại và Email</h4>
                            <div className={cx('user__info__item__contact')}>
                                <div className={cx('user__info__item__contact__1')}>
                                    <FontAwesomeIcon icon={faPhone} />
                                    <div className={cx('user__info__item__contact__1__info')}>
                                        <p>Số điện thoại</p>
                                        <span>0899804328</span>
                                    </div>
                                </div>
                                <Button variant="outlined">Cập nhật</Button>
                            </div>

                            <div className={cx('user__info__item__contact')}>
                                <div className={cx('user__info__item__contact__1')}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <div className={cx('user__info__item__contact__1__info')}>
                                        <p>Địa chỉ email</p>
                                        <span>Thêm địa chỉ email</span>
                                    </div>
                                </div>
                                <Button variant="outlined">Cập nhật</Button>
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
                </div>
            </div>
        </div>
    );
}

export default Personal;
