import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './modalFeedback.module.scss';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Rating, TextField, Button } from '@mui/material';
import { requestAddFeedback } from '../../../../../../config/config';

const cx = classNames.bind(styles);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    borderRadius: '12px',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    p: 4,
};

function ModalFeedback({ open, setOpen, nameProduct, idOrder }) {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        const data = {
            rating,
            content: feedback,
            productId: idOrder,
        };

        try {
            const res = await requestAddFeedback(data);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant="h6" mb={2} textAlign="center">
                        <h4>Đánh giá sản phẩm</h4>
                        <span style={{ borderBottom: '1px solid #ccc' }}>{nameProduct}</span>
                    </Typography>
                    <div className={cx('modal-content')}>
                        <div className="rating-section">
                            <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} size="large" />
                        </div>
                        <TextField
                            label="Nhập nội dung đánh giá, tối đa 70 ký tự"
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="feedback-input"
                        />
                        <div className="button-group">
                            <Button className="cancel" onClick={handleClose}>
                                Hủy
                            </Button>
                            <Button className="submit" onClick={handleSubmit}>
                                Gửi đánh giá
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalFeedback;
