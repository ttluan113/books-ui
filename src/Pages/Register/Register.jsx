import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Header from '../../Components/Header/Header';
import { useState } from 'react';
import { TextField, IconButton, InputAdornment, Button, Box, Link, Divider } from '@mui/material';
import { Visibility, VisibilityOff, Google } from '@mui/icons-material';

import logo from '../../../public/images/logo.webp';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';
import { requestRegister } from '../../config/config';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);
function RegisterUser() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleGoogleLogin = () => {
        // Xử lý logic đăng nhập bằng Google ở đây
        console.log('Đăng nhập bằng Google');
    };

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleRegister = async () => {
        const data = {
            fullName,
            phone,
            email,
            password,
        };
        try {
            const res = await requestRegister(data);
            toast.success(res.message);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            navigate('/');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>
            <main className={cx('main')}>
                <div className={cx('inner')}>
                    <div className={cx('logo')}>
                        <img src={logo} alt="" />
                        <h2>L2 Team</h2>
                        <p>
                            Chào mừng bạn đến với cửa hàng sách trực tuyến của chúng tôi! Để tiếp tục mua sắm và tận
                            hưởng các ưu đãi hấp dẫn, vui lòng đăng nhập vào tài khoản của bạn.
                        </p>
                    </div>
                    <div className={cx('form')}>
                        <h1>Đăng Ký</h1>
                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                maxWidth: 400,
                                margin: '0 auto',
                                padding: 3,
                            }}
                        >
                            <TextField
                                required
                                fullWidth
                                label="Tên Đầy Đủ"
                                name="fullName"
                                type="text"
                                onChange={(e) => setFullName(e.target.value)}
                                value={fullName}
                            />

                            <TextField
                                required
                                fullWidth
                                label="Số Điện Thoại"
                                name="phone"
                                type="number"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                            />

                            <TextField
                                required
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <TextField
                                required
                                fullWidth
                                label="Mật khẩu"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button onClick={handleRegister} variant="contained" fullWidth sx={{ mt: 2 }}>
                                Đăng Ký
                            </Button>

                            <Divider sx={{ my: 2 }}>Hoặc</Divider>

                            <Button
                                variant="outlined"
                                fullWidth
                                startIcon={<Google />}
                                onClick={handleGoogleLogin}
                                sx={{
                                    borderColor: '#00796b',
                                    '&:hover': {
                                        borderColor: '#004d40',
                                        backgroundColor: 'rgba(0, 121, 107, 0.04)',
                                    },
                                }}
                            >
                                Đăng nhập bằng Google
                            </Button>
                            <LinkRouter to="/login" style={{ textAlign: 'center', color: '#1976d2' }}>
                                Đã có tài khoản? Đăng nhập ngay
                            </LinkRouter>
                        </Box>
                    </div>
                </div>
            </main>
            <ToastContainer />
        </div>
    );
}

export default RegisterUser;
