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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

import { useTheme } from '../../store/Provider';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header() {
    const dataUser = useStore();

    const { mode, toggleTheme } = useTheme();

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

    const [showNotify, setShowNotify] = useState(false);

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
                        <Link to={'/cart'}>
                            <Tooltip title="Giỏ hàng">
                                <button className={cx(mode === 'dark' ? 'cart__dark' : 'cart')}>
                                    <FontAwesomeIcon icon={faCartPlus} />
                                </button>
                            </Tooltip>
                        </Link>
                        <div className={cx('notify')}>
                            <button onClick={() => setShowNotify(!showNotify)}>
                                <Tooltip title={!showNotify && 'Thông báo'}>
                                    <FontAwesomeIcon
                                        id={cx(mode === 'dark' ? 'icon__notify__dark' : 'icon__notify')}
                                        icon={faBell}
                                    />
                                </Tooltip>
                            </button>

                            {showNotify && (
                                <div className={cx(mode === 'dark' ? 'result__notify__dark' : 'result__notify')}>
                                    <div className={cx('result__notify__header')}>
                                        <h3>Thông Báo</h3>
                                    </div>
                                    <div>
                                        <ul>
                                            <li>
                                                <img
                                                    src="https://salt.tikicdn.com/cache/128x128/ts/upload/b4/57/39/dde396bd53a086adf9d421877ad9259a.jpg"
                                                    alt=""
                                                />
                                                <div className={cx('result__notify__info')}>
                                                    <p>Tặng bạn mã giảm giá 100% sản phẩm</p>
                                                    <span>24/12/2024</span>
                                                </div>
                                            </li>

                                            <li>
                                                <img
                                                    src="https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/468635100_2030335600772187_8549397888606208782_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=4i0l7tJGlYkQ7kNvgG8SF1x&_nc_oc=AdjxM7_BD6oHPGnki5DHSjtVSaNXZ-Kit8Lx6mzvtCfqE08kG-msHgVri4I_rZ6wE2lMksScatVlNdA_BwUUi8Vg&_nc_zt=24&_nc_ht=scontent.fhan3-4.fna&_nc_gid=AZs6NpFZ6wjmK_D9vXSO805&oh=00_AYA4MzhE62btNFzyCuDTfCNJ9f8CuqEaPNSA15Zh9EYX2w&oe=676D5C0B"
                                                    alt=""
                                                />
                                                <div className={cx('result__notify__info')}>
                                                    <p>Trần Luân đã phản hồi bình luận của bạn</p>
                                                    <span>24/12/2024</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
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
