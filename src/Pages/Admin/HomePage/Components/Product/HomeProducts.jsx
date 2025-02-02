import classNames from 'classnames/bind';
import styles from './HomeProducts.module.scss';
import AddProduct from './AddProduct';

import { useState, useEffect } from 'react';
import { requestGetProducts } from '../../../../../config/config';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';

const cx = classNames.bind(styles);

function createData(img, name, price, quantity, category) {
    return { img, name, price, quantity, category };
}

function HomeProducts() {
    const [dataProducts, setDataProducts] = useState([]);

    const [type, setType] = useState(0);

    const fetchData = async () => {
        const res = await requestGetProducts();
        setDataProducts(res);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const rows = dataProducts.map((product) => {
        return createData(product.images[0], product.name, product.price, product.quantity, product.category);
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header__home__page')}>
                <h4>Quản lý sản phẩm</h4>
                <Button onClick={() => setType(type == 0 ? 1 : 0)} variant="contained">
                    {type === 0 ? ' Thêm sản phẩm' : 'Quay lại'}
                </Button>
            </div>
            <div>
                {type === 0 ? (
                    <div className={cx('main__home__page')}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Ảnh</TableCell>
                                        <TableCell align="center">Tên</TableCell>
                                        <TableCell align="center">Danh mục</TableCell>
                                        <TableCell align="center">Giá</TableCell>
                                        <TableCell align="center">Số lượng còn lại</TableCell>
                                        <TableCell align="center">Hành động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <img
                                                    id={cx('img__product')}
                                                    src={`${import.meta.env.VITE_URL_IMAGE}/uploads/products/${
                                                        row.img
                                                    }`}
                                                    alt=""
                                                />
                                            </TableCell>
                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="center">{row.category}</TableCell>
                                            <TableCell align="center">{row.price.toLocaleString()} VNĐ</TableCell>
                                            <TableCell align="center">{row.quantity}</TableCell>
                                            <TableCell
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '20px',
                                                }}
                                            >
                                                <Button variant="contained">Sửa</Button>
                                                <Button
                                                    color="error"
                                                    style={{ marginBottom: '13px' }}
                                                    variant="contained"
                                                >
                                                    Xoá
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ) : type === 1 ? (
                    <AddProduct />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default HomeProducts;
