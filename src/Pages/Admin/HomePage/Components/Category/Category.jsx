import classNames from 'classnames/bind';
import styles from './Category.module.scss';

import { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import ModalDeleteCategory from './Components/ModalDeleteCategory/ModalDeleteCategory';
import { requestGetCategory } from '../../../../../config/config';
import { ToastContainer } from 'react-toastify';
import ModalAddCategory from './Components/ModalAddCategory/ModalAddCategory';
import ModalEditCategory from './Components/ModalEditCategory/ModalEditCategory';

const cx = classNames.bind(styles);
function Category() {
    const [open, setOpen] = useState(false);
    const [openAddCategory, setOpenAddCategory] = useState(false);
    const [openEditCategory, setOpenEditCategory] = useState(false);

    const [dataCategory, setDataCategory] = useState([]);
    const [dataOneCategory, setDataOneCategory] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await requestGetCategory();
                setDataCategory(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();

        document.title = 'Quản lý danh mục';
    }, [open, openAddCategory, openEditCategory]);

    function createData(id, name, lengthProduct) {
        return { id, name, lengthProduct };
    }

    const rows = dataCategory.map((category) => {
        return createData(category._id, category.nameCategory, category.lengthProduct);
    });
    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div className={cx('header')}>
                <h4>Quản lý danh mục</h4>
                <Button onClick={() => setOpenAddCategory(true)} variant="contained">
                    Thêm danh mục
                </Button>
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên danh mục</TableCell>
                                <TableCell align="center">Số lượng sản phẩm trong danh mục</TableCell>
                                <TableCell align="center">Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">{row.lengthProduct}</TableCell>
                                    <TableCell
                                        align="center"
                                        style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}
                                    >
                                        <Button
                                            onClick={() => {
                                                setOpenEditCategory(true);
                                                setDataOneCategory(row);
                                            }}
                                            color="warning"
                                            variant="contained"
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setOpen(true);
                                                setDataOneCategory(row);
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
            <ModalDeleteCategory open={open} setOpen={setOpen} dataOneCategory={dataOneCategory} />
            <ModalAddCategory open={openAddCategory} setOpen={setOpenAddCategory} />
            <ModalEditCategory
                open={openEditCategory}
                setOpen={setOpenEditCategory}
                dataOneCategory={dataOneCategory}
            />
        </div>
    );
}

export default Category;
