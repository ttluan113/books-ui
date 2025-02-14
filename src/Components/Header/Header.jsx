import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import logo from '../../../public/images/logo.webp';
import { Link, useNavigate } from 'react-router-dom';
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useEffect, useState } from 'react';
import { requestGetNotify, requestLogout, requestReadAllNotify } from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

import { useTheme } from '../../store/Provider';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import Notify from './Components/Notify/Notify';

const cx = classNames.bind(styles);

function Header() {
    const { dataUser, dataCart } = useStore();

    const [lengthCart, setLengthCart] = useState(0);
    const { mode, toggleTheme } = useTheme();

    useEffect(() => {
        const length = dataCart?.data?.reduce((total, item) => total + item.quantityUserBuy, 0);
        setLengthCart(length || 0);
    }, [dataCart]);

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await requestLogout();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <div className={cx(mode === 'dark' ? 'wrapper__dark' : 'wrapper')}>
            <div className={cx('inner')}>
                <Link to="/">
                    <Tooltip title="Trang Chủ L2 Team">
                        <div className={cx('logo')}>
                            <img src={logo} alt="logo" />
                            <h1>L2 Team</h1>
                        </div>
                    </Tooltip>
                </Link>
                <div className={cx('search')}>
                    <input type="text" placeholder="Tìm kiếm" />
                </div>

                {dataUser._id ? (
                    <div className={cx('user')}>
                        <div className={cx(mode === 'dark' ? 'cart__dark' : 'cart')}>
                            <div className={cx(mode === 'dark' ? 'number__notify__dark' : 'number__notify')}>
                                {lengthCart}
                            </div>
                            <Link to={'/cart'}>
                                <Tooltip title="Giỏ hàng">
                                    <button>
                                        <FontAwesomeIcon icon={faCartPlus} />
                                    </button>
                                </Tooltip>
                            </Link>
                        </div>

                        <div>
                            <Notify />
                        </div>

                        <Box>
                            <Tooltip title="Cài đặt tài khoản">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar src={dataUser.avatar} sx={{ width: 25, height: 25, objectFit: 'cover' }} />
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
                                Xin chào : {dataUser.fullName}
                            </MenuItem>
                            <Divider />
                            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={'/customer'}>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Cài đặt tài khoản
                                </MenuItem>
                            </Link>

                            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={'/order'}>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <ShoppingCartIcon fontSize="small" />
                                    </ListItemIcon>
                                    Đơn hàng của tôi
                                </MenuItem>
                            </Link>

                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Đăng xuất
                            </MenuItem>
                        </Menu>

                        <div className={cx('mode')}>
                            <button onClick={toggleTheme}>
                                {mode === 'dark' ? (
                                    <Tooltip title="Giao diện sáng">
                                        <FontAwesomeIcon id={cx('icon__dark')} icon={faSun} />
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Giao diện tối">
                                        <FontAwesomeIcon icon={faMoon} />
                                    </Tooltip>
                                )}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={cx('user')}>
                        <Link to="/login">
                            <button className={cx(mode === 'dark' ? 'login__dark' : 'login')}>Đăng nhập</button>
                        </Link>
                        <Link to="/register">
                            <button className={cx(mode === 'dark' ? 'register__dark' : 'register')}>Đăng ký</button>
                        </Link>
                        <div className={cx('mode')}>
                            <button onClick={toggleTheme}>
                                {mode === 'dark' ? (
                                    <FontAwesomeIcon id={cx('icon__dark')} icon={faSun} />
                                ) : (
                                    <FontAwesomeIcon icon={faMoon} />
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
