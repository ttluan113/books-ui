import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { useEffect, useState } from 'react';
import SlideBar from './SlideBar/SlideBar';
import HomePage from './HomePage/HomePage';

const cx = classNames.bind(styles);

function Dashboard() {
    useEffect(() => {
        document.title = 'Admin | L2 Team';
    }, []);

    const [type, setType] = useState(0);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide-bar')}>
                <SlideBar type={type} setType={setType} />
            </div>
            <div className={cx('home-page')}>
                <HomePage type={type} />
            </div>
        </div>
    );
}

export default Dashboard;
