import classNames from 'classnames/bind';
import styles from './Payments.module.scss';

import Header from '../../Components/Header/Header';

import { useEffect, useMemo, useState } from 'react';

import { useStore } from '../../hooks/useStore';
import { requestGetCarts, requestPayment, requestSearchAddress } from '../../config/config';
import { Link, useNavigate } from 'react-router-dom';

import useDebounce from '../../hooks/useDebounce';
import { useTheme } from '../../store/Provider';
import { toast, ToastContainer } from 'react-toastify';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const cx = classNames.bind(styles);

function Payments() {
    useEffect(() => {
        document.title = 'L2 Team | Thanh Toán';
    }, []);

    const { mode } = useTheme();

    const [inputValueAddress, setInputValueAddress] = useState('');
    const [selectValue, setSelectValue] = useState([]);
    const valueSearch = useDebounce(inputValueAddress, 500);
    const [address, setAddress] = useState('');

    const [checkTypePayment, setCheckTypePayment] = useState('COD');

    const { dataUser } = useStore();

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [dataCarts, setDataCarts] = useState([]);
    const [totalCart, setTotalCart] = useState(0);

    const navigate = useNavigate();

    const fetchData = async () => {
        const res = await requestGetCarts();
        setDataCarts(res.data);
        setTotalCart(res.total);
    };

    useEffect(() => {
        setFullName(dataUser?.fullName);
        setPhone(`0${dataUser?.phone}`);
        setAddress(dataUser?.address);
        fetchData();
    }, [dataUser]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestSearchAddress(valueSearch);
            setSelectValue(res);
        };
        fetchData();
    }, [valueSearch]);

    const handlePayment = async () => {
        const data = {
            address,
            typePayments: checkTypePayment,
            phone,
        };
        try {
            const res = await requestPayment(data);
            if (checkTypePayment === 'COD') {
                navigate(`/checkout/${res.orderId}`);
            }
            if (checkTypePayment === 'MOMO') {
                window.open(res);
            }
            if (checkTypePayment === 'VNPAY') {
                window.open(res);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <header>
                <Header />
            </header>

            <main className={cx('main')}>
                <div className={cx('left')}>
                    <div className={cx(mode === 'dark' ? 'list_product__dark' : 'list_product')}>
                        <h4>Thông tin sản phẩm</h4>
                        <div className={cx(mode === 'dark' ? 'list_product__item__dark' : 'list_product__item')}>
                            <ul>
                                {dataCarts.map((item) => (
                                    <li>
                                        <img
                                            src={`${import.meta.env.VITE_URL_IMAGE}/uploads/products/${
                                                item?.images[0]
                                            }`}
                                            alt=""
                                        />
                                        <div className={cx('list_product__item__info__1')}>
                                            <div className={cx('list_product__item__info')}>
                                                <span className={cx('product__item__name')}>{item?.name}</span>
                                                <p className={cx('product__item__quantity')}>
                                                    Số lượng : x{item.quantityUserBuy}
                                                </p>
                                                <span className={cx('product__item__price')}>
                                                    {item.price.toLocaleString()} ₫
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={cx(mode === 'dark' ? 'form__input__dark' : 'form__input')}>
                        <h4>Thông tin nhận hàng</h4>

                        <div className={cx('form__input__list')}>
                            <TextField
                                id="outlined-basic"
                                label="Số điện thoại"
                                variant="outlined"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                            />

                            <Stack spacing={2} sx={{ width: '100%' }}>
                                <Autocomplete
                                    freeSolo
                                    id="free-solo-2-demo"
                                    disableClearable
                                    options={selectValue.map((option) => option.description)}
                                    value={address}
                                    onChange={(event, newValue) => {
                                        setAddress(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            sx={{ width: '100%' }}
                                            label="Nhập địa chỉ"
                                            onChange={(e) => setInputValueAddress(e.target.value)}
                                            slotProps={{
                                                input: {
                                                    ...params.InputProps,
                                                    type: 'search',
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </Stack>
                        </div>

                        <div>
                            <h4>Danh sách địa chỉ hiện có</h4>
                            {dataUser?.addressDefault?.map((address) => (
                                <div
                                    key={address._id}
                                    onClick={() => {
                                        setAddress(address.address);
                                        setPhone(address.phone);
                                        setFullName(address.fullName);
                                    }}
                                    className={cx(
                                        mode === 'dark' ? 'form__input__address__dark' : 'form__input__address',
                                    )}
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
                            ))}
                        </div>
                    </div>

                    <div className={cx(mode === 'dark' ? 'form__payment__dark' : 'form__payment')}>
                        <h4>Chọn hình thức thanh toán</h4>
                        <div className={cx('form__payment__list')}>
                            <div className={cx(mode === 'dark' ? 'form__payment__item__dark' : 'form__payment__item')}>
                                <input
                                    type="radio"
                                    name="payment"
                                    id="payment1"
                                    onChange={() => setCheckTypePayment('COD')}
                                    checked={checkTypePayment === 'COD'}
                                />
                                <img
                                    src="https://salt.tikicdn.com/ts/upload/92/b2/78/1b3b9cda5208b323eb9ec56b84c7eb87.png"
                                    alt=""
                                />
                                <label htmlFor="payment1">Thanh toán tiền mặt</label>
                            </div>
                            <div className={cx(mode === 'dark' ? 'form__payment__item__dark' : 'form__payment__item')}>
                                <input
                                    type="radio"
                                    name="payment"
                                    id="payment2"
                                    onChange={() => setCheckTypePayment('MOMO')}
                                    checked={checkTypePayment === 'MOMO'}
                                />
                                <img
                                    src="https://salt.tikicdn.com/ts/upload/ce/f6/e8/ea880ef285856f744e3ffb5d282d4b2d.jpg"
                                    alt=""
                                />
                                <label htmlFor="payment2">Ví Momo</label>
                            </div>
                            <div className={cx(mode === 'dark' ? 'form__payment__item__dark' : 'form__payment__item')}>
                                <input
                                    type="radio"
                                    name="payment"
                                    id="payment3"
                                    onChange={() => setCheckTypePayment('VNPAY')}
                                    checked={checkTypePayment === 'VNPAY'}
                                />
                                <img
                                    src="https://salt.tikicdn.com/ts/upload/77/6a/df/a35cb9c62b9215dbc6d334a77cda4327.png"
                                    alt=""
                                />
                                <label htmlFor="payment3">Ví VNPAY</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx(mode === 'dark' ? 'right__dark' : 'right')}>
                    <div className={cx('right__header')}>
                        <h4>Giao tới </h4>
                    </div>
                    <div className={cx('right__address')}>
                        <div className={cx(mode === 'dark' ? 'right__address__info__dark' : 'right__address__info')}>
                            <p>{fullName}</p>
                            <p>{phone}</p>
                        </div>
                        <p className={cx('right__address__user')}>Địa chỉ: {address}</p>
                    </div>

                    <div className={cx('right__product__list')}>
                        <div className={cx('right__product__header')}>
                            <h4>Đơn hàng</h4>
                            <Link to={'/cart'}>
                                <button>Thay đổi</button>
                            </Link>
                        </div>

                        <div>
                            <div className={cx(mode === 'dark' ? 'right__product__dark' : 'right__product')}>
                                <h5>Tổng tiền hàng</h5>
                                <span>
                                    {dataCarts
                                        .reduce((total, item) => total + item.price * item.quantityUserBuy, 0)
                                        .toLocaleString()}
                                    đ
                                </span>
                            </div>

                            <div className={cx(mode === 'dark' ? 'right__product__dark' : 'right__product')}>
                                <h5>Phí vận chuyển</h5>
                                <span>Miễn phí</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('right__product__total')}>
                            <h4>Tổng tiền thanh toán</h4>
                            <span>{totalCart.toLocaleString()} đ</span>
                        </div>
                        <p className={cx('right__product__total__text')}>
                            (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)
                        </p>
                        <button onClick={handlePayment} className={cx('right-btn')}>
                            Đặt hàng
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Payments;
