import classNames from 'classnames/bind';
import styles from './VerifyAccount.module.scss';

import Header from '../../Components/Header/Header';

import { Box, TextField, Button, Typography, Container } from '@mui/material';

import { useState } from 'react';
import { useTheme } from '../../store/Provider';
import { requestVerifyAccount } from '../../config/config';

import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function VerifyAccount() {
    const { mode } = useTheme();

    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const navigate = useNavigate();

    const handleChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Tự động chuyển sang ô tiếp theo nếu giá trị được nhập
        if (value && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpCode = otp.join('');
        try {
            await requestVerifyAccount(otpCode);
            navigate('/');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <header>
                <Header />
            </header>

            <main className={cx(mode === 'dark' ? 'main__dark' : 'main')}>
                <Container maxWidth="sm">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '50vh',
                            gap: 2,
                        }}
                    >
                        <Typography variant="h4" component="h1" gutterBottom>
                            Xác thực tài khoản
                        </Typography>
                        <Typography variant="body1" color="textSecondary" align="center">
                            Chúng tôi đã gửi mã OTP gồm 6 chữ số tới email của bạn. Vui lòng nhập nó bên dưới để xác
                            minh tài khoản của bạn.
                        </Typography>

                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                display: 'flex',
                                gap: 2,
                                justifyContent: 'center',
                                marginTop: 3,
                            }}
                        >
                            {otp.map((digit, index) => (
                                <TextField
                                    key={index}
                                    id={`otp-input-${index}`}
                                    type="text"
                                    inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    sx={{ width: '50px' }}
                                    variant="outlined"
                                />
                            ))}
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleSubmit}
                            sx={{ marginTop: 3 }}
                        >
                            Xác thực tài khoản
                        </Button>
                    </Box>
                </Container>
            </main>
        </div>
    );
}

export default VerifyAccount;
