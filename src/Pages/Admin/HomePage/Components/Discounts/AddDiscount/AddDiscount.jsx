import classNames from 'classnames/bind';
import styles from './AddDiscount.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';
import { requestAddDiscount } from '../../../../../../config/config';

const cx = classNames.bind(styles);

function AddDisCount() {
    const [nameDiscount, setNameDiscount] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState(null);
    const [discountValue, setDiscountValue] = useState(0);
    const [discountPercent, setDiscountPercent] = useState(0);

    const handleDateChange = (newValue) => {
        if (newValue) {
            // Chuyển đổi sang định dạng dd/MM/yyyy
            const formattedDate = dayjs(newValue).format('DD/MM/YYYY');
            setDateStart(formattedDate);
        } else {
            setDateStart(null);
        }
    };

    const handleDateChange1 = (newValue) => {
        if (newValue) {
            // Chuyển đổi sang định dạng dd/MM/yyyy
            const formattedDate = dayjs(newValue).format('DD/MM/YYYY');
            setDateEnd(formattedDate);
        } else {
            setDateEnd(null);
        }
    };

    const handleAddDiscount = async () => {
        const data = {
            name: nameDiscount,
            dateStart: dateStart,
            dateEnd: dateEnd,
            discount_min_value_order: discountValue,
            discount_percent: discountPercent,
        };
        try {
            const res = await requestAddDiscount(data);
            toast.success(res.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <main>
                <div className={cx('form')}>
                    <TextField
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#fff', // Màu viền mặc định
                                },
                                '&:hover fieldset': {
                                    borderColor: '#fff', // Màu viền khi hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#3f51b5', // Màu viền khi focus
                                },
                            },
                        }}
                        id="outlined-basic"
                        label="Tên khuyến mãi"
                        fullWidth
                        variant="outlined"
                        value={nameDiscount}
                        onChange={(e) => setNameDiscount(e.target.value)}
                    />

                    <TextField
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#fff', // Màu viền mặc định
                                },
                                '&:hover fieldset': {
                                    borderColor: '#fff', // Màu viền khi hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#3f51b5', // Màu viền khi focus
                                },
                            },
                        }}
                        id="outlined-basic"
                        label="giá trị đơn hàng tối thiểu"
                        fullWidth
                        variant="outlined"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                    />

                    <TextField
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#fff', // Màu viền mặc định
                                },
                                '&:hover fieldset': {
                                    borderColor: '#fff', // Màu viền khi hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#3f51b5', // Màu viền khi focus
                                },
                            },
                        }}
                        id="outlined-basic"
                        label="Phần trăm giảm giá"
                        fullWidth
                        type="number"
                        variant="outlined"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(e.target.value)}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateField']}>
                            <DateField onChange={handleDateChange} fullWidth label="Ngày bắt đầu" />
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateField']}>
                            <DateField onChange={handleDateChange1} fullWidth label="Ngày kết thúc" />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>

                <div style={{ paddingTop: '10px' }}>
                    <Button onClick={handleAddDiscount} fullWidth variant="contained">
                        Tạo mã
                    </Button>
                </div>
            </main>
        </div>
    );
}

export default AddDisCount;
