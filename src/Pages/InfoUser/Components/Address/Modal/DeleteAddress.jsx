import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useState } from 'react';
import { requestAuth, requestDeleteAddress } from '../../../../../config/config';
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

function ModalDeleteAddress({ open, setOpen, dataAddress }) {
    const handleClose = () => setOpen(false);

    const handleDeleteAddress = async () => {
        try {
            const res = await requestDeleteAddress(dataAddress._id);
            toast.success(res.message);
            handleClose();
            window.location.reload();
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
                <Typography id="modal-modal-description">
                    Bạn có chắc muốn xoá địa chỉ này?
                    <p style={{ paddingTop: '10px', color: ' #ff424e' }}>{dataAddress.address}</p>
                </Typography>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px' }}>
                    <Button onClick={handleClose} variant="contained" color="error">
                        Huỷ
                    </Button>
                    <Button onClick={handleDeleteAddress} variant="contained">
                        Xoá
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default ModalDeleteAddress;
