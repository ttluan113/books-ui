import classNames from 'classnames/bind';
import styles from './ModalAddCategory.module.scss';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { useState } from 'react';
import { requestAddCategory } from '../../../../../../../config/config';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

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

function ModalAddCategory({ open, setOpen }) {
    const handleClose = () => setOpen(false);
    const [valueCategory, setValueCategory] = useState('');

    const handleAddCategory = async () => {
        try {
            const res = await requestAddCategory({ valueCategory });
            toast.success(res.message);
            setValueCategory('');
            handleClose();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thêm danh mục
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Tên danh mục"
                            variant="outlined"
                            onChange={(e) => setValueCategory(e.target.value)}
                            value={valueCategory}
                        />
                        <Button onClick={handleAddCategory} sx={{ mt: 2 }} fullWidth variant="contained">
                            Thêm danh mục
                        </Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalAddCategory;
