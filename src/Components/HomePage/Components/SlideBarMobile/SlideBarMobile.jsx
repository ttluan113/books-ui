import classNames from 'classnames/bind';
import styles from './SlideBarMobile.module.scss';
import { Link } from 'react-router-dom';

import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog, faHome, faTable, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../../../store/Provider';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';

import imgCategory from '../../../../assets/imgCategory.webp';

import { useState, useEffect } from 'react';
import { requestGetCategory } from '../../../../config/config';

import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const cx = classNames.bind(styles);

function SlideBarMobile() {
    const { mode } = useTheme();

    const navigate = useNavigate();

    const [dataCategory, setDataCategory] = useState([]);

    const fetchData = async () => {
        const res = await requestGetCategory('');
        setDataCategory(res);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={cx(mode === 'dark' ? 'wrapper__dark' : 'wrapper')}>
            <ul>
                <Link to={'/'}>
                    <li>
                        <FontAwesomeIcon id={cx('icon')} icon={faHome} />
                        Trang chủ
                    </li>
                </Link>
                <li onClick={handleClickOpen}>
                    <FontAwesomeIcon id={cx('icon')} icon={faTable} />
                    <Link>Danh mục</Link>
                </li>
                <Link>
                    <li>
                        <FontAwesomeIcon id={cx('icon')} icon={faBlog} />
                        Bài viết
                    </li>
                </Link>
            </ul>

            <>
                <Dialog
                    sx={{
                        '& .MuiDialog-paper': {
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: '5%',
                            backgroundColor: '#071b2f',
                        },
                    }}
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={cx('appbar')} sx={{ position: 'relative' }}>
                        <Toolbar className={cx('toolbar')}>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Danh mục
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleClose}>
                                <FontAwesomeIcon style={{ fontSize: '20px' }} icon={faXmark} />
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <List className={cx('list')}>
                        {dataCategory.map((category) => (
                            <ListItemButton
                                key={category._id}
                                onClick={() => {
                                    const searchParams = new URLSearchParams(window.location.search);
                                    searchParams.set('category', category._id);
                                    navigate(`?${searchParams.toString()}`);
                                    handleClose();
                                }}
                            >
                                <img className={cx('img')} src={imgCategory} alt="" />
                                <h4>{category.nameCategory}</h4>
                                <Divider />
                            </ListItemButton>
                        ))}
                    </List>
                </Dialog>
            </>
        </div>
    );
}

export default SlideBarMobile;
