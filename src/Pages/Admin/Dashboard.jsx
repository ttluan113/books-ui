import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { useEffect } from 'react';
import SlideBar from './SlideBar/SlideBar';
import HomePage from './HomePage/HomePage';

const cx = classNames.bind(styles);

function Dashboard() {
    useEffect(() => {
        document.title = 'Admin | L2 Team';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide-bar')}>
                <SlideBar />
            </div>
            <div className={cx('home-page')}>
                <HomePage />
            </div>
        </div>
    );
}

export default Dashboard;
