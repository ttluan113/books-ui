import classNames from 'classnames/bind';
import styles from './NewAddress.module.scss';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';

import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

import { useEffect, useState } from 'react';

import useDebounce from '../../../../../hooks/useDebounce';
import { requestCreateAddress, requestSearchAddress } from '../../../../../config/config';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
};

function NewAddress({ open, setOpen }) {
    const [address, setAddress] = useState([]);

    const [valueSearchAddress, setValueSearchAddress] = useState('');

    const valueSearch = useDebounce(valueSearchAddress, 500);

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestSearchAddress(valueSearch);
            setAddress(res);
        };
        fetchData();
    }, [valueSearch]);

    const handleCreateAddress = async () => {
        try {
            const data = {
                fullName,
                phone,
                address: valueSearchAddress,
            };
            const res = await requestCreateAddress(data);
            toast.success(res.message);
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
                        Địa chỉ mới
                    </Typography>
                    <div className={cx('header')}>
                        <TextField
                            id="outlined-basic"
                            label="Họ và tên"
                            variant="outlined"
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Số điện thoại"
                            variant="outlined"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div>
                        <Stack spacing={2} sx={{ width: '100%' }}>
                            <Autocomplete
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                options={address.map((option) => option.description)}
                                value={valueSearchAddress}
                                onChange={(event, newValue) => {
                                    setValueSearchAddress(newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        sx={{ width: '100%' }}
                                        label="Nhập địa chỉ"
                                        onChange={(e) => setValueSearchAddress(e.target.value)}
                                        slotProps={{
                                            input: {
                                                ...params.InputProps,
                                                type: 'search',
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Stack>
                    </div>

                    <div className={cx('footer')}>
                        <Button onClick={handleClose} color="error" variant="contained">
                            Huỷ
                        </Button>
                        <Button onClick={handleCreateAddress} variant="contained">
                            Lưu
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default NewAddress;
