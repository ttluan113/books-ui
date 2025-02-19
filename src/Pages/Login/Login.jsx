import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Header from '../../Components/Header/Header';
import { useEffect, useState } from 'react';
import { TextField, IconButton, InputAdornment, Button, Box, Divider } from '@mui/material';
import { Visibility, VisibilityOff, Google } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import logo from '../../../public/images/logo.webp';

import { Link as LinkRouter, useNavigate } from 'react-router-dom';
import { requestLogin, requestLoginGoogle } from '../../config/config';
import { useTheme } from '../../store/Provider';
import { useStore } from '../../hooks/useStore';
import SlideBarMobile from '../../Components/HomePage/Components/SlideBarMobile/SlideBarMobile';

const cx = classNames.bind(styles);
function LoginUser() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const clientId = import.meta.env.VITE_CLIENT_ID_GOOGLE;

    const { mode } = useTheme();
    const { dataUser } = useStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (dataUser._id) {
            navigate('/');
        }
    }, [dataUser]);

    const handleLogin = async () => {
        const data = {
            email,
            password,
        };
        try {
            const res = await requestLogin(data);
            toast.success(res.message);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            navigate('/');
        } catch (error) {
            if (error.response.data.success === false) {
                navigate('/verify');
            }
            toast.error(error.response.data);
        }
    };

    const handleSuccess = async (response) => {
        const { credential } = response; // Nhận ID Token từ Google
        try {
            const res = await requestLoginGoogle(credential);
            toast.success(res.message);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className={cx(mode === 'dark' ? 'wrapper__dark' : 'wrapper')}>
            <header>
                <Header />
            </header>
            <main className={cx('main')}>
                <div className={cx(mode === 'dark' ? 'inner__dark' : 'inner')}>
                    <div className={cx('logo')}>
                        <img src={logo} alt="" />
                        <h2>L2 Book</h2>
                        <p>
                            Chào mừng bạn đến với cửa hàng sách trực tuyến của chúng tôi! Để tiếp tục mua sắm và tận
                            hưởng các ưu đãi hấp dẫn, vui lòng đăng nhập vào tài khoản của bạn.
                        </p>
                    </div>
                    <div className={cx('form')}>
                        <h1>Đăng nhập</h1>
                        <Box
                            component="email"
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

                            <LinkRouter to="/forgot-password" id={cx('link')}>
                                Quên mật khẩu?
                            </LinkRouter>

                            <Button onClick={handleLogin} variant="contained" fullWidth sx={{ mt: 2 }}>
                                Đăng nhập
                            </Button>

                            <Divider sx={{ my: 2 }}>Hoặc</Divider>

                            <LinkRouter to="/register" style={{ textAlign: 'center', color: '#1976d2' }}>
                                Chưa có tài khoản? Đăng ký ngay
                            </LinkRouter>

                            <GoogleOAuthProvider clientId={clientId}>
                                <GoogleLogin onSuccess={handleSuccess} onError={() => console.log('Login Failed')} />
                            </GoogleOAuthProvider>
                        </Box>
                    </div>
                </div>
            </main>
            <ToastContainer />
            <div className={cx('slide-bar')}>
                <SlideBarMobile />
            </div>
        </div>
    );
}

export default LoginUser;
