import classNames from 'classnames/bind';
import styles from './HomeDiscount.module.scss';
import AddDisCount from './AddDiscount/AddDiscount';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { useEffect, useState } from 'react';
import { requestGetDiscount } from '../../../../../config/config';
import ModalDelete from './ModalDeleteDiscount/Modal';
import { ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function HomeDiscount() {
    const [dataDiscount, setDataDiscount] = useState([]);
    const [open, setOpen] = useState(false);

    const [openDelete, setOpenDelete] = useState(false);
    const [dataOneDiscount, setDataOneDiscount] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetDiscount();
            setDataDiscount(res);
        };
        fetchData();
        document.title = 'Quản lý mã giảm giá';
    }, [openDelete, open]);

    function createData(id, name, dateStart, dateEnd, discount_user_used) {
        return { id, name, dateStart, dateEnd, discount_user_used };
    }

    const rows = dataDiscount.map((item) => {
        return createData(item._id, item.name, item.dateStart, item.dateEnd, item.discount_user_used);
    });

    const convertToVietnamDate = (utcString) => {
        const utcTime = new Date(utcString);
        const vietnamTime = new Date(utcTime.getTime() + 7 * 60 * 60 * 1000);
        return vietnamTime.toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    };

    // Gọi callback với tham số động

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div className={cx('header')}>
                <h4>Quản lý mã giảm giá</h4>
                <Button onClick={() => setOpen(open === false ? true : false)} variant="contained">
                    {open === false ? 'Thêm mã giảm giá' : 'Quay lại'}
                </Button>
            </div>
            {open === false ? (
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tên mã giảm giá</TableCell>
                                    <TableCell align="center">Ngày bắt đầu</TableCell>
                                    <TableCell align="center">Ngày kết thúc</TableCell>
                                    <TableCell align="center">Số lượng người sử dụng</TableCell>
                                    <TableCell align="center">Hành động</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center">{convertToVietnamDate(row.dateStart)}</TableCell>
                                        <TableCell align="center">{convertToVietnamDate(row.dateEnd)}</TableCell>
                                        <TableCell align="center">{row.discount_user_used.length}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                onClick={() => {
                                                    setOpenDelete(true);
                                                    setDataOneDiscount(row);
                                                }}
                                                color="error"
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
            ) : (
                <AddDisCount />
            )}
            <ModalDelete open={openDelete} setOpen={setOpenDelete} dataOneDiscount={dataOneDiscount} />
        </div>
    );
}

export default HomeDiscount;
