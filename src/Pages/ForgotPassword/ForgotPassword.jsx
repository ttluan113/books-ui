import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss';
import Header from '../../Components/Header/Header';

import { useTheme } from '../../store/Provider';
import { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { jwtDecode } from 'jwt-decode';

import { requestForgotPassword, requestResetPassword } from '../../config/config';

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import cookies from 'js-cookie'

const cx = classNames.bind(styles);

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [checkEmail, setCheckEmail] = useState(true);
    const [newPassword, setNewPassword] = useState('');

    const navigate = useNavigate();

    const [otp, setOtp] = useState('');

    useEffect(() => {
        document.title = 'Quên mật khẩu';
    }, []);



    const token = cookies.get('token');
    

    useEffect(() => {
        if (!token) {
           return
        }
        const data = jwtDecode(token);
        setEmail(data?.email);
        setCheckEmail(false);
    }, [token]);

    const { mode } = useTheme();

    const handleCreateOTP = async () => {
        try {
            if (!email) {
                toast.error('Vui lòng nhập email');
            }
            if (checkEmail === true) {
                toast.success('Vui lòng chờ !!!');
                const res = await requestForgotPassword(email);
                setCheckEmail(false);
                toast.success(res.message);
            } else {
                const res = await requestResetPassword(otp, newPassword);
                toast.success(res.message);
                navigate('/login');
            }
        } catch (error) {
            setTimeout(() => {
                toast.error(error.response.data.message);
            }, 2000);
        }
    };

    return (
        <div className={cx(mode === 'dark' ? 'wrapper__dark' : 'wrapper')}>
            <ToastContainer />
            <header>
                <Header />
            </header>

            <main className={cx(mode === 'dark' ? 'main__dark' : 'main')}>
                <div>
                    <h1>Quên mật khẩu</h1>
                    <p>Nhập email của bạn chúng tôi sẽ gửi bạn mã khôi phục mật khẩu</p>
                </div>
                <div className={cx('input')}>
                    <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        value={email}
                    />
                    <TextField
                        onChange={(e) => setOtp(e.target.value)}
                        value={otp}
                        disabled={checkEmail}
                        id="outlined-basic"
                        label="Nhập mã xác nhận"
                        variant="outlined"
                    />
                    {checkEmail === false && (
                        <TextField
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                            id="outlined-basic"
                            label="Mật khẩu mới"
                            variant="outlined"
                        />
                    )}
                </div>

                <div>
                    <Button onClick={handleCreateOTP} fullWidth variant="contained">
                        {checkEmail ? 'Gửi mã' : 'Đặt lại mật khẩu'}
                    </Button>
                </div>
            </main>
        </div>
    );
}

export default ForgotPassword;
