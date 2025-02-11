import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Address.module.scss';

import Button from '@mui/material/Button';

import NewAddress from './Modal/NewAddress';
import { useStore } from '../../../../hooks/useStore';

import { ToastContainer } from 'react-toastify';
import ModalDeleteAddress from './Modal/DeleteAddress';

const cx = classNames.bind(styles);

function Address() {
    const [open, setOpen] = useState(false);

    const [openDeleteAddress, setOpenDeleteAddress] = useState(false);

    const [dataAddress, setDataAddress] = useState({});

    const { dataUser, mode } = useStore();

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div className={cx('header')}>
                <h4>Địa chỉ của tôi</h4>
                <Button onClick={() => setOpen(true)} size="small" variant="contained">
                    Thêm địa chỉ mới
                </Button>
            </div>

            <div className={cx('main')}>
                {dataUser?.addressDefault?.map((address) => (
                    <div key={address._id} className={cx('form__input__address__wrapper')}>
                        <div
                            key={address._id}
                            onClick={() => {}}
                            className={cx(mode === 'dark' ? 'form__input__address__dark' : 'form__input__address')}
                        >
                            <div className={cx('form__input__address__info__1')}>
                                <div className={cx('form__input__address__info')}>
                                    <h4>{address.fullName}</h4>
                                    <span>{address.phone}</span>
                                </div>
                                <div>
                                    <p>{address.address}</p>
                                </div>
                            </div>
                        </div>

                        <div className={cx('form__input__address__btn')}>
                            <div
                                onClick={() => {
                                    setDataAddress(address);
                                    setOpenDeleteAddress(true);
                                }}
                            >
                                Xoá địa chỉ
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <NewAddress open={open} setOpen={setOpen} />
            <ModalDeleteAddress open={openDeleteAddress} setOpen={setOpenDeleteAddress} dataAddress={dataAddress} />
        </div>
    );
}

export default Address;
