import classNames from 'classnames/bind';
import styles from './Blog.module.scss';

import Button from '@mui/material/Button';
import AddBlog from './Components/AddBlog/AddBlog';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { requestDeleteBlog, requestGetBlogs } from '../../../../../config/config';

import TimeAgo from '../../../../../utils/TimeAgo';

const cx = classNames.bind(styles);

function Blog() {
    const [type, setType] = useState(0);

    const [dataBlog, setDataBlog] = useState([]);

    const fetchData = async () => {
        const res = await requestGetBlogs();
        setDataBlog(res);
    };

    useEffect(() => {
        fetchData();
    }, [type]);

    function createData(id, name, image, createdAt) {
        return { id, name, image, createdAt };
    }

    const rows = dataBlog.map((blog) => {
        return createData(blog._id, blog.nameBlog, blog.image, blog.createdAt);
    });

    const handleDeleteBlog = async (idBlog) => {
        try {
            const res = await requestDeleteBlog(idBlog);
            await fetchData();
            toast.success(res.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div className={cx('header')}>
                <h4>Quản lý bài viết</h4>
                <Button variant="contained" onClick={() => setType(type === 0 ? 1 : 0)}>
                    {type === 0 ? 'Thêm bài viết' : 'Quay lại'}
                </Button>
            </div>

            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên bài viết</TableCell>
                                <TableCell align="center">Ảnh</TableCell>
                                <TableCell align="center">Ngày đăng</TableCell>
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
                                                borderRadius: '10px',
                                            }}
                                            src={`${import.meta.env.VITE_URL_IMAGE}/uploads/blogs/${row?.image}`}
                                            alt=""
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <TimeAgo createdAt={row.createdAt} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            onClick={() => handleDeleteBlog(row.id)}
                                            color="error"
                                            variant="contained"
                                        >
                                            Xoá bài viết
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {type === 1 && <AddBlog />}
        </div>
    );
}

export default Blog;
