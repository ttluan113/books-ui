import classNames from 'classnames/bind';
import styles from './index.module.scss';
import SlideBar from './Components/SlideBar/SlideBar';
import HomePage from './Components/HomePage/HomePage';

const cx = classNames.bind(styles);

function IndexHomePage() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide-bar')}>
                <SlideBar />
            </div>

            <div>
                <HomePage />
            </div>
        </div>
    );
}

export default IndexHomePage;
