import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { requestDeleteProduct } from '../../../../../../config/config';

import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
};

export default function ModalDeleteProduct({ open, setOpen, dataOneProduct }) {
    const handleClose = () => setOpen(false);

    const handleDeleteProduct = async () => {
        try {
            const res = await requestDeleteProduct(dataOneProduct.id);
            toast.success(res.message);
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
                        Xoá sản phẩm : {dataOneProduct.name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Bạn muốn xoá sản phẩm này ?
                    </Typography>
                    <Button sx={{ mt: 2 }} color="error" variant="contained" onClick={handleDeleteProduct}>
                        Xoá sản phẩm
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
