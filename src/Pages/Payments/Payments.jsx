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

const cx = classNames.bind(styles);

function Payments() {
    useEffect(() => {
        document.title = 'L2 Team | Thanh Toán';
    }, []);

    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

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
                            <TextField id="outlined-basic" label="Họ tên" variant="outlined" />
                            <TextField id="outlined-basic" label="Điện thoại di động" variant="outlined" />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Tỉnh/Thành phố</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Tỉnh/Thành phố"
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Quận/Huyện</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Quận/Huyện">
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Phường/Xã</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Phường/Xã">
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
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
                <div className={cx('right')}></div>
            </main>
        </div>
    );
}

export default Payments;
