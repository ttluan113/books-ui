import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import logo from '../../../public/images/logo.webp';
import { Link } from 'react-router-dom';
import { useStore } from '../../hooks/useStore';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useState } from 'react';
import { requestLogout } from '../../config/config';

const cx = classNames.bind(styles);

function Header() {
    const dataUser = useStore();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        const res = await requestLogout();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/">
                    <div className={cx('logo')}>
                        <img src={logo} alt="logo" />
                        <h1>L2 Team</h1>
                    </div>
                </Link>
                <div className={cx('search')}>
                    <input type="text" placeholder="Tìm kiếm" />
                </div>
                {dataUser._id ? (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Tooltip title="Cài đặt tài khoản">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar src={dataUser.avatar} sx={{ width: 40, height: 40, objectFit: 'cover' }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            slotProps={{
                                paper: {
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem>
                                <Avatar
                                    src={dataUser.avatar}
                                    sx={{ width: 32, height: 32, objectFit: 'cover' }}
                                    alt={dataUser.fullName}
                                />
                                Tài khoản của tôi
                            </MenuItem>
                            <Divider />

                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Cài đặt tài khoản
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Đăng xuất
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <div className={cx('user')}>
                        <Link to="/login">
                            <button className={cx('login')}>Đăng nhập</button>
                        </Link>
                        <Link to="/register">
                            <button className={cx('register')}>Đăng ký</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
