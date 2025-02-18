import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';

import { useStore } from '../../../../../hooks/useStore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCrown, faGift } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { requestGetStatistical } from '../../../../../config/config';

import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const cx = classNames.bind(styles);

function Dashboard() {
    const { dataUser } = useStore();

    const [dataStatiscal, setDataStatiscal] = useState({});
    const [dataChart, setDataChart] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await requestGetStatistical();
                setDataStatiscal(res);
                setDataChart(res.formattedResult);
            } catch (error) {
                navigate('/notfound');
            }
        };

        fetchData();
    }, []);
    const data = {
        labels: dataChart.map((label) => label.dayOfWeek),
        datasets: [
            {
                label: 'Doanh thu',
                data: dataChart.map((chart) => `${chart.totalRevenue}`),
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
                            <span>{dataStatiscal.totalOrder}</span>
                            <p>Tổng đơn hàng đã giao thành công</p>
                            <p>+{dataStatiscal.percentOrder}% so với ngày hôm qua</p>
                        </div>

                        <div className={cx('header__admin__row1__inner__2')}>
                            <div>
                                <FontAwesomeIcon id={cx('icon')} icon={faGift} />
                            </div>
                            <span>{dataStatiscal.totalProduct}</span>
                            <p>Sản phẩm đã bán</p>
                            <p>+{dataStatiscal.percentProduct}% so với ngày hôm qua</p>
                        </div>

                        <div className={cx('header__admin__row1__inner__3')}>
                            <div>
                                <FontAwesomeIcon id={cx('icon')} icon={faUser} />
                            </div>
                            <span>{dataStatiscal.totalUser}</span>
                            <p>Người dùng mới</p>
                            <p>+{dataStatiscal.percentUser}% so với ngày hôm qua</p>
                        </div>

                        <div className={cx('header__admin__row2')}>
                            <div className={cx('header__admin__row2__avatar')}>
                                <img
                                    src={`${import.meta.env.VITE_URL_IMAGE}/uploads/avatars/${dataUser.avatar}`}
                                    alt=""
                                />
                                <FontAwesomeIcon id={cx('icon')} icon={faCrown} />
                            </div>
                            <h4>{dataUser.fullName}</h4>
                            <p>{dataUser.email}</p>
                            <span>0{dataUser.phone}</span>
                            <p>Chức vụ : Quản Trị Website</p>
                        </div>
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
