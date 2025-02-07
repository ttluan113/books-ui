import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { requestDeleteCategory } from '../../../../../../../config/config';

import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ModalDeleteCategory({ open, setOpen, dataOneCategory }) {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDeleteCategory = async () => {
        try {
            const res = await requestDeleteCategory(dataOneCategory.id);
            handleClose();
            toast.success(res.message);
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
                        Xoá danh mục
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, color: 'red', fontWeight: '600' }}>
                        Lưu ý : khi bạn xoá danh mục, tất cả các sản phẩm trong danh mục cũng sẽ bị xoá
                    </Typography>
                    <Button sx={{ mt: 2 }} color="error" variant="contained" onClick={handleDeleteCategory}>
                        Vẫn xoá danh mục
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalDeleteCategory;
