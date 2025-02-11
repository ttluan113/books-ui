import classNames from 'classnames/bind';

import styles from './Favorite.module.scss';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useEffect, useState } from 'react';
import { requestGetHeartProductUser } from '../../../../config/config';
import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Favorite() {
    const [dataHeartProduct, setDataHeartProduct] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetHeartProductUser();
            setDataHeartProduct(res);
        };
        fetchData();
    }, []);

    function createData(id, name, images, category, price) {
        return { id, name, images, category, price };
    }

    const rows = dataHeartProduct.map((item) => {
        return createData(item._id, item.name, item.images, item.category, item.price);
    });
    return (
        <div className={cx('wrapper')}>
            <h4>Danh sách sản phẩm yêu thích</h4>
            <div style={{ paddingTop: '20px' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên sản phẩm</TableCell>
                                <TableCell align="center">Ảnh</TableCell>
                                <TableCell align="center">Danh mục</TableCell>
                                <TableCell align="center">Giá</TableCell>
                                <TableCell align="center">Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        <img
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                            }}
                                            src={`${import.meta.env.VITE_URL_IMAGE}/uploads/products/${row?.images}`}
                                            alt=""
                                        />
                                    </TableCell>
                                    <TableCell align="center">{row.category}</TableCell>
                                    <TableCell align="center">{row.price.toLocaleString()} VNĐ</TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => navigate(`/product/${row.id}`)} variant="contained">
                                            Chi tiết
                                        </Button>
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

export default Favorite;
