import classNames from 'classnames/bind';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { useState } from 'react';
import { requestAddCategory, requestEditCategory } from '../../../../../../../config/config';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function ModalEditCategory({ open, setOpen, dataOneCategory }) {
    console.log(dataOneCategory);

    const handleClose = () => setOpen(false);
    const [valueCategory, setValueCategory] = useState('');

    const handleEditCategory = async () => {
        try {
            const data = {
                valueCategory,
                id: dataOneCategory.id,
            };
            if (!valueCategory) {
                return toast.error('Vui lòng nhập danh sách');
            }
            const res = await requestEditCategory(data);
            toast.success(res.message);
            setValueCategory('');
            handleClose();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Sửa danh mục : {dataOneCategory.name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Tên danh mục mới"
                            variant="outlined"
                            onChange={(e) => setValueCategory(e.target.value)}
                            value={valueCategory}
                        />
                        <Button onClick={handleEditCategory} sx={{ mt: 2 }} fullWidth variant="contained">
                            Sửa danh mục
                        </Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalEditCategory;
