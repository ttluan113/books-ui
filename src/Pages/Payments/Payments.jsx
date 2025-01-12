import classNames from 'classnames/bind';
import styles from './Payments.module.scss';

import Header from '../../Components/Header/Header';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useStore } from '../../hooks/useStore';

const cx = classNames.bind(styles);

function Payments() {
    useEffect(() => {
        document.title = 'L2 Team | Thanh Toán';
    }, []);

    const [tinhthanh, setTinhThanh] = useState([]);
    const [idTinhThanh, setIdTinhThanh] = useState(0);
    const [huyen, setHuyen] = useState([]);
    const [idHuyen, setIdHuyen] = useState(0);
    const [xa, setXa] = useState([]);

    useEffect(() => {
        axios.get('https://esgoo.net/api-tinhthanh/1/0.htm').then((res) => setTinhThanh(res.data.data));
    }, []);

    useEffect(() => {
        if (idTinhThanh !== 0) {
            axios.get(`https://esgoo.net/api-tinhthanh/2/${idTinhThanh}.htm`).then((res) => setHuyen(res.data.data));
        }
    }, [idTinhThanh]);

    useEffect(() => {
        if (idHuyen !== 0) {
            axios.get(`https://esgoo.net/api-tinhthanh/3/${idHuyen}.htm`).then((res) => setXa(res.data.data));
        }
    }, [idHuyen]);

    const dataUser = useStore();

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        setFullName(dataUser?.fullName);
        setPhone(`0${dataUser?.phone}`);
    }, [dataUser]);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx('main')}>
                <div className={cx('left')}>
                    <div className={cx('list_product')}>
                        <h4>Thông tin sản phẩm</h4>
                        <div className={cx('list_product__item')}>
                            <ul>
                                <li>
                                    <img
                                        src="https://salt.tikicdn.com/cache/96x96/ts/product/91/e7/7e/24461c4d1f848b11eaa4ff444f1ec5f9.jpg.webp"
                                        alt=""
                                    />
                                    <div className={cx('list_product__item__info__1')}>
                                        <div className={cx('list_product__item__info')}>
                                            <span className={cx('product__item__name')}>
                                                Điện Thoại Oppo A58 6GB/128GB - Hàng Chính Hãng - Xanh
                                            </span>
                                            <div className={cx('product__item__div')}>
                                                <p>SL : x1</p>
                                                <span>4.090.000 ₫</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <img
                                        src="https://salt.tikicdn.com/cache/96x96/ts/product/91/e7/7e/24461c4d1f848b11eaa4ff444f1ec5f9.jpg.webp"
                                        alt=""
                                    />
                                    <div className={cx('list_product__item__info__1')}>
                                        <div className={cx('list_product__item__info')}>
                                            <span className={cx('product__item__name')}>
                                                Điện Thoại Oppo A58 6GB/128GB - Hàng Chính Hãng - Xanh
                                            </span>
                                            <div className={cx('product__item__div')}>
                                                <p>SL : x1</p>
                                                <span>4.090.000 ₫</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <img
                                        src="https://salt.tikicdn.com/cache/96x96/ts/product/91/e7/7e/24461c4d1f848b11eaa4ff444f1ec5f9.jpg.webp"
                                        alt=""
                                    />
                                    <div className={cx('list_product__item__info__1')}>
                                        <div className={cx('list_product__item__info')}>
                                            <span className={cx('product__item__name')}>
                                                Điện Thoại Oppo A58 6GB/128GB - Hàng Chính Hãng - Xanh
                                            </span>
                                            <div className={cx('product__item__div')}>
                                                <p>SL : x1</p>
                                                <span>4.090.000 ₫</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <img
                                        src="https://salt.tikicdn.com/cache/96x96/ts/product/91/e7/7e/24461c4d1f848b11eaa4ff444f1ec5f9.jpg.webp"
                                        alt=""
                                    />
                                    <div className={cx('list_product__item__info__1')}>
                                        <div className={cx('list_product__item__info')}>
                                            <span className={cx('product__item__name')}>
                                                Điện Thoại Oppo A58 6GB/128GB - Hàng Chính Hãng - Xanh
                                            </span>
                                            <div className={cx('product__item__div')}>
                                                <p>SL : x1</p>
                                                <span>4.090.000 ₫</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <img
                                        src="https://salt.tikicdn.com/cache/96x96/ts/product/91/e7/7e/24461c4d1f848b11eaa4ff444f1ec5f9.jpg.webp"
                                        alt=""
                                    />
                                    <div className={cx('list_product__item__info__1')}>
                                        <div className={cx('list_product__item__info')}>
                                            <span className={cx('product__item__name')}>
                                                Điện Thoại Oppo A58 6GB/128GB - Hàng Chính Hãng - Xanh
                                            </span>
                                            <div className={cx('product__item__div')}>
                                                <p>SL : x1</p>
                                                <span>4.090.000 ₫</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <img
                                        src="https://salt.tikicdn.com/cache/96x96/ts/product/91/e7/7e/24461c4d1f848b11eaa4ff444f1ec5f9.jpg.webp"
                                        alt=""
                                    />
                                    <div className={cx('list_product__item__info__1')}>
                                        <div className={cx('list_product__item__info')}>
                                            <span className={cx('product__item__name')}>
                                                Điện Thoại Oppo A58 6GB/128GB - Hàng Chính Hãng - Xanh
                                            </span>
                                            <div className={cx('product__item__div')}>
                                                <p>SL : x1</p>
                                                <span>4.090.000 ₫</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <img
                                        src="https://salt.tikicdn.com/cache/96x96/ts/product/91/e7/7e/24461c4d1f848b11eaa4ff444f1ec5f9.jpg.webp"
                                        alt=""
                                    />
                                    <div className={cx('list_product__item__info__1')}>
                                        <div className={cx('list_product__item__info')}>
                                            <span className={cx('product__item__name')}>
                                                Điện Thoại Oppo A58 6GB/128GB - Hàng Chính Hãng - Xanh
                                            </span>
                                            <div className={cx('product__item__div')}>
                                                <p>SL : x1</p>
                                                <span>4.090.000 ₫</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div>
                                <div className={cx('product__item__info__2')}>
                                    <FontAwesomeIcon icon={faTruckFast} />
                                    <span>Được giao bởi L2 Team (giao từ Hà Nội)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('form__input')}>
                        <h4>Thông tin nhận hàng</h4>
                        <div className={cx('form__input__list')}>
                            <TextField
                                onChange={(e) => setFullName(e.target.value)}
                                value={fullName}
                                id="outlined-basic"
                                label="Họ tên"
                                variant="outlined"
                                type="text"
                            />
                            <TextField
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                id="outlined-basic"
                                label="Điện thoại di động"
                                variant="outlined"
                                type="number"
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Tỉnh/Thành phố</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Tỉnh/Thành phố"
                                    onChange={(e) => setIdTinhThanh(e.target.value)}
                                >
                                    {tinhthanh.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Quận/Huyện</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Quận/Huyện"
                                    onChange={(e) => setIdHuyen(e.target.value)}
                                >
                                    {huyen.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Phường/Xã</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Phường/Xã">
                                    {xa.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField id="outlined-basic" label="Địa chỉ" variant="outlined" />
                        </div>
                        <Button variant="contained">Lưu địa chỉ</Button>
                    </div>

                    <div className={cx('form__payment')}>
                        <h4>Chọn hình thức thanh toán</h4>
                        <div className={cx('form__payment__list')}>
                            <div className={cx('form__payment__item')}>
                                <input type="radio" name="payment" id="payment1" />
                                <img
                                    src="https://salt.tikicdn.com/ts/upload/92/b2/78/1b3b9cda5208b323eb9ec56b84c7eb87.png"
                                    alt=""
                                />
                                <label htmlFor="payment1">Thanh toán tiền mặt</label>
                            </div>
                            <div className={cx('form__payment__item')}>
                                <input type="radio" name="payment" id="payment2" />
                                <img
                                    src="https://salt.tikicdn.com/ts/upload/ce/f6/e8/ea880ef285856f744e3ffb5d282d4b2d.jpg"
                                    alt=""
                                />
                                <label htmlFor="payment2">Ví Momo</label>
                            </div>
                            <div className={cx('form__payment__item')}>
                                <input type="radio" name="payment" id="payment3" />
                                <img
                                    src="https://salt.tikicdn.com/ts/upload/77/6a/df/a35cb9c62b9215dbc6d334a77cda4327.png"
                                    alt=""
                                />
                                <label htmlFor="payment3">Ví VNPAY</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('right__header')}>
                        <h4>Giao tới</h4>
                    </div>
                    <div className={cx('right__address')}>
                        <div className={cx('right__address__info')}>
                            <p>{fullName}</p>
                            <p>{phone}</p>
                        </div>
                        <p className={cx('right__address__user')}>Địa chỉ: Hà Nội</p>
                    </div>

                    <div className={cx('right__product__list')}>
                        <div className={cx('right__product__header')}>
                            <h4>Đơn hàng</h4>
                            <button>Thay đổi</button>
                        </div>

                        <div>
                            <div className={cx('right__product')}>
                                <h5>Tổng tiền hàng</h5>
                                <span>16.000.000 đ</span>
                            </div>

                            <div className={cx('right__product')}>
                                <h5>Phí vận chuyển</h5>
                                <span>25.000 đ</span>
                            </div>

                            <div className={cx('right__product')}>
                                <h5>Giảm giá trực tiếp</h5>
                                <span>16.000.000 đ</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('right__product__total')}>
                            <h4>Tổng tiền thanh toán</h4>
                            <span>16.000.000 đ</span>
                        </div>
                        <p className={cx('right__product__total__text')}>
                            (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)
                        </p>
                        <button className={cx('right-btn')}>Đặt hàng</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Payments;
