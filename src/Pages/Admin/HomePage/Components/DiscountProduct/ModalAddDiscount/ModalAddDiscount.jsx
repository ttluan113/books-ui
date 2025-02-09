import classNames from 'classnames/bind';
import styles from './ModalAddDiscount.module.scss';

import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { requestCreateDiscountProduct, requestGetProducts } from '../../../../../../config/config';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const cx = classNames.bind(styles);

function ModalAddDiscount() {
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);

    const [selectedRows, setSelectedRows] = useState([]);

    const [dataProduct, setDataProduct] = useState([]);
    const [valueDiscount, setValueDiscount] = useState(0);
    const [dateEnd, setDateEnd] = useState(Date.now());

    useEffect(() => {
        const fetchData = async () => {
            const data = {
                sortType: '',
                category: '',
            };
            const res = await requestGetProducts(data);
            setDataProduct(res.data);
        };
        fetchData();
    }, []);

    const columns = [
        { field: 'name', headerName: 'Tên sản phẩm', width: 130 },
        {
            field: 'images',
            headerName: 'Ảnh sản phẩm',
            width: 200, // Tăng chiều rộng của cột
            renderCell: (params) => (
                <img
                    src={`${import.meta.env.VITE_URL_IMAGE}/uploads/products/${params.value}`}
                    alt="product"
                    style={{
                        width: '50%', // Để ảnh vừa với ô
                        height: '100%', // Chiều cao cố định
                        objectFit: 'cover', // Đảm bảo ảnh không bị méo
                        borderRadius: '8px', // Bo góc cho đẹp
                        padding: '8px', // Tạo khoảng cách giữa ảnh và viền
                    }}
                />
            ),
        },

        {
            field: 'price',
            headerName: 'Giá sản phẩm',
            type: 'number',
            width: 150,
        },
        {
            field: 'category',
            headerName: 'Danh mục',
            width: 160,
        },
    ];

    const rows = dataProduct.map((item) => ({
        id: item._id,
        name: item.name,
        images: item.images[0],
        price: item.price,
        category: item.nameCategory,
    }));

    const paginationModel = { page: 0, pageSize: 10 };

    const handleDateChangeEnd = (newValue) => {
        if (newValue) {
            // Chuyển đổi sang định dạng dd/MM/yyyy

            setDateEnd(newValue);
        } else {
            setDateEnd(null);
        }
    };

    const handleAddDiscount = async () => {
        try {
            const data = {
                arrayIdProduct: selectedRows,
                discount: valueDiscount,
                dateEnd: dateEnd,
            };
            const res = await requestCreateDiscountProduct(data);
            toast.success(res.message);
            handleClose();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <h4>Giảm giá sản phẩm</h4>
                        <div className={cx('search')}>
                            <TextField fullWidth id="outlined-basic" label="Tìm kiếm sản phẩm..." variant="outlined" />
                        </div>

                        <div className={cx('list__product')}>
                            <Paper sx={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    initialState={{ pagination: { paginationModel } }}
                                    pageSizeOptions={[5, 10]}
                                    checkboxSelection
                                    sx={{ border: 0 }}
                                    rowHeight={100}
                                    onRowSelectionModelChange={(newSelection) => {
                                        setSelectedRows(newSelection); // ✅ Cập nhật danh sách hàng được chọn
                                    }}
                                />
                            </Paper>
                        </div>

                        <div>
                            <TextField
                                onChange={(e) => setValueDiscount(e.target.value)}
                                value={valueDiscount}
                                fullWidth
                                id="outlined-basic"
                                label="Nhập % giảm giá"
                                variant="outlined"
                            />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateField']}>
                                    <DateField fullWidth label="Ngày kết thúc" onChange={handleDateChangeEnd} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>

                        <div className={cx('button__group__action')}>
                            <Button onClick={handleAddDiscount} fullWidth variant="contained" color="primary">
                                Lưu
                            </Button>
                            <Button fullWidth variant="contained" color="error">
                                Hủy
                            </Button>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}

export default ModalAddDiscount;
