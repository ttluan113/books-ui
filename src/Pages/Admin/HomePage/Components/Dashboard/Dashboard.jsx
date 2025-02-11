import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';

import { useStore } from '../../../../../hooks/useStore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCrown, faGift } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const cx = classNames.bind(styles);

function Dashboard() {
    const { dataUser } = useStore();

    useEffect(() => {
        document.title = 'Quản trị admin ';
    }, []);

    const data = {
        labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
        datasets: [
            {
                label: 'Value',
                data: [30, 50, 40, 60, 80, 70, 90],
                backgroundColor: 'rgba(136, 132, 216, 0.6)',
                borderColor: '#8884d8',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,

        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Doanh thu 7 ngày gần nhất' },
        },
    };

    return (
        <div className={cx('wrapper')}>
            <h4>Quản trị admin</h4>
            <div className={cx('header__admin')}>
                <div className={cx('header__admin__title')}>
                    <h3>Doanh thu hôm nay</h3>
                    <p>Tóm tắt doanh số</p>
                </div>
                <div className={cx('header__admin__content')}>
                    <div className={cx('header__admin__row1')}>
                        <div className={cx('header__admin__row1__inner__1')}>
                            <div>
                                <FontAwesomeIcon id={cx('icon')} icon={faBookmark} />
                            </div>
                            <span>500</span>
                            <p>Tổng đơn hàng</p>
                            <p>+10% so với ngày hôm qua</p>
                        </div>

                        <div className={cx('header__admin__row1__inner__2')}>
                            <div>
                                <FontAwesomeIcon id={cx('icon')} icon={faGift} />
                            </div>
                            <span>500</span>
                            <p>Sản phẩm đã bán</p>
                            <p>+10% so với ngày hôm qua</p>
                        </div>

                        <div className={cx('header__admin__row1__inner__3')}>
                            <div>
                                <FontAwesomeIcon id={cx('icon')} icon={faUser} />
                            </div>
                            <span>500</span>
                            <p>Người dùng mới</p>
                            <p>+10% so với ngày hôm qua</p>
                        </div>
                    </div>
                    <div className={cx('header__admin__row2')}>
                        <div className={cx('header__admin__row2__avatar')}>
                            <img src={`${import.meta.env.VITE_URL_IMAGE}/uploads/avatars/${dataUser.avatar}`} alt="" />
                            <FontAwesomeIcon id={cx('icon')} icon={faCrown} />
                        </div>
                        <h4>{dataUser.fullName}</h4>
                        <p>{dataUser.email}</p>
                        <span>0{dataUser.phone}</span>
                        <p>Chức vụ : Quản Trị Website</p>
                    </div>
                </div>
            </div>

            <div className={cx('main__admin__chart')}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}

export default Dashboard;
