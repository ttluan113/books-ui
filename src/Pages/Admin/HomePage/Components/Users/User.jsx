import classNames from 'classnames/bind';
import styles from './User.module.scss';

import { useState, useEffect } from 'react';
import { requestGetAllUser } from '../../../../../config/config';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';

const cx = classNames.bind(styles);

function ControllerUser() {
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetAllUser();
            setDataUser(res);
        };
        fetchData();
    }, []);

    function createData(id, fullName, avatar, email, phone, role, status) {
        return { id, avatar, fullName, email, phone, role, status };
    }

    const rows = dataUser.map((item) => {
        return createData(item._id, item.fullName, item.avatar, item.email, item.phone, item.isAdmin, item.isActive);
    });

    return (
        <div className={cx('wrapper')}>
            <h4>Danh sách người dùng</h4>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên người dùng</TableCell>
                            <TableCell align="center">Avatar</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Số diện thoại</TableCell>
                            <TableCell align="center">Chức vụ</TableCell>
                            <TableCell align="center">Trạng thái</TableCell>
                            <TableCell align="center">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.fullName}
                                </TableCell>
                                <TableCell align="center">
                                    <img
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            objectFit: 'cover',
                                            borderRadius: '50%',
                                        }}
                                        src={`${import.meta.env.VITE_URL_IMAGE}/uploads/avatars/${row.avatar}`}
                                        alt={row.fullName}
                                    />
                                </TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">0{row.phone}</TableCell>
                                <TableCell align="center">{row.role ? 'Admin' : 'Người dùng'} </TableCell>
                                <TableCell align="center">{row.status ? 'Khoá' : 'Hoạt động'}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        onClick={() => handleDeleteDiscount(row.id)}
                                        style={{ marginLeft: '10px' }}
                                        color="error"
                                        variant="contained"
                                    >
                                        Khoá người dùng
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ControllerUser;
