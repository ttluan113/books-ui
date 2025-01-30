import classNames from 'classnames/bind';
import styles from './Order.module.scss';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { requestGetHistoryOrder, requestEditOrder } from '../../../../../config/config';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

const steps = ['Chờ xử lý', 'Đã xác nhận', 'Chờ vận chuyển', 'Đã giao hàng'];

const cx = classNames.bind(styles);
function Order() {
    const [activeStep, setActiveStep] = useState(0);
    const [dataOrder, setDataOrder] = useState([]);
    const [params, setParams] = useState('pending');

    useEffect(() => {
        switch (activeStep) {
            case 0:
                setParams('pending');
                break;
            case 1:
                setParams('completed');
                break;
            case 2:
                setParams('shipping');
                break;
            case 3:
                setParams('delivered');
                break;
            case 4:
                setParams('cancelled');
                break;
            default:
                break;
        }
    }, [activeStep]);

    const fetchData = async () => {
        const res = await requestGetHistoryOrder({ params: params });
        setDataOrder(res);
    };

    useEffect(() => {
        fetchData();

        document.title = 'Quản lý đơn hàng';
    }, [params]);

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    function createData(id, img, name, phone, address, quantity) {
        return {
            id,
            img,
            name,
            phone,
            address,
            quantity,
        };
    }

    const rows = dataOrder.map((item) =>
        createData(item._id, item.images[0], item.name, item.phone, item.address, item.quantity),
    );

    const handleOrder = async (id, type) => {
        const data = {
            statusOrder: type === 0 ? 'completed' : type === 1 ? 'shipping' : 'delivered',
            idOrder: id,
        };
        try {
            await requestEditOrder(data);
            fetchData();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h4>Quản lý đơn hàng</h4>
            <div className={cx('header__home__page')}>
                <Box sx={{ width: '100%' }}>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepButton
                                    sx={{
                                        color: '#fff',
                                        '& .MuiStepLabel-label': {
                                            color: '#fff',
                                        },

                                        '& .Mui-active': {
                                            color: 'red ',
                                        },
                                        '& .Mui-completed': {
                                            color: '#fff !important',
                                        },
                                    }}
                                    onClick={handleStep(index)}
                                >
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </div>

            <div className={cx('main__home__page')}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ảnh sản phẩm</TableCell>
                                <TableCell align="center">Tên sản phẩm</TableCell>
                                <TableCell align="center">Số điện thoại</TableCell>
                                <TableCell align="center">Địa chỉ</TableCell>
                                <TableCell align="center">Số lượng</TableCell>
                                {activeStep === 3 ? <></> : <TableCell align="center">Hành động</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <img
                                            style={{ width: '100px', objectFit: 'cover' }}
                                            src={`${import.meta.env.VITE_URL_IMAGE}/uploads/products/${row.img}`}
                                            alt=""
                                        />
                                    </TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">0{row.phone}</TableCell>
                                    <TableCell align="center">{row.address}</TableCell>
                                    <TableCell align="center">{row.quantity}</TableCell>
                                    <TableCell align="center">
                                        {activeStep === 0 ? (
                                            <Button onClick={() => handleOrder(row.id, 0)} variant="contained">
                                                Xác nhận
                                            </Button>
                                        ) : activeStep === 1 ? (
                                            <Button onClick={() => handleOrder(row.id, 1)} variant="contained">
                                                Chuyển cho bên vận chuyển
                                            </Button>
                                        ) : activeStep === 2 ? (
                                            <Button onClick={() => handleOrder(row.id, 2)} variant="contained">
                                                Đã giao hàng
                                            </Button>
                                        ) : (
                                            <></>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default Order;
