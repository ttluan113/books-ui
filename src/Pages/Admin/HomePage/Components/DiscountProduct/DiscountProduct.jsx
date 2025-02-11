import classNames from 'classnames/bind';
import styles from './DiscountProduct.module.scss';

import Button from '@mui/material/Button';
import ModalAddDiscount from './ModalAddDiscount/ModalAddDiscount';

import { toast, ToastContainer } from 'react-toastify';

import { useEffect, useState } from 'react';
import { requestDeleteDiscountProduct, requestGetProductSale } from '../../../../../config/config';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const cx = classNames.bind(styles);

function DiscountProduct() {
    const [open, setOpen] = useState(false);

    const [dataProduct, setDataProduct] = useState([]);

    const fetchData = async () => {
        const res = await requestGetProductSale();
        setDataProduct(res);
    };

    useEffect(() => {
        fetchData();
    }, [open]);

    function createData(id, name, images, price, priceNew, quantity, discount) {
        return { id, name, images, price, priceNew, quantity, discount };
    }

    const rows = dataProduct.map((item) => {
        return createData(item._id, item.name, item.images[0], item.price, item.priceNew, item.quantity, item.discount);
    });

    const handleShowOpen = () => {
        setOpen(true);
    };

    const handleDeleteDiscount = async (id) => {
        console.log(id);

        try {
            const res = await requestDeleteDiscountProduct(id);
            toast.success(res.message);
            fetchData();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div className={cx('header')}>
                <h4>Giảm giá sản phẩm</h4>
                <Button onClick={handleShowOpen} variant="contained">
                    Thêm giảm giá
                </Button>
            </div>

            <div className={cx('main')}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên sản phẩm</TableCell>
                                <TableCell align="center">Ảnh</TableCell>
                                <TableCell align="center">Giá</TableCell>
                                <TableCell align="center">Giá gốc</TableCell>
                                <TableCell align="center">Giảm giá</TableCell>
                                <TableCell align="center">Số lượng</TableCell>
                                <TableCell align="center">Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        <img
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                objectFit: 'cover',
                                                borderRadius: '10px',
                                            }}
                                            src={`${import.meta.env.VITE_URL_IMAGE}/uploads/products/${row.images}`}
                                            alt={row.images}
                                        />
                                    </TableCell>
                                    <TableCell align="center">{row.priceNew.toLocaleString()} VNĐ</TableCell>
                                    <TableCell align="center">{row.price.toLocaleString()} VNĐ</TableCell>
                                    <TableCell align="center">{row.discount} %</TableCell>
                                    <TableCell align="center">{row.quantity}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            onClick={() => handleDeleteDiscount(row.id)}
                                            style={{ marginLeft: '10px' }}
                                            color="error"
                                            variant="contained"
                                        >
                                            Xoá giảm giá
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <ModalAddDiscount open={open} setOpen={setOpen} />
        </div>
    );
}

export default DiscountProduct;
