import classNames from 'classnames/bind';
import styles from './SlideBar.module.scss';
import { useTheme } from '../../../../store/Provider';
import { useEffect, useState } from 'react';
import { requestGetCategory } from '../../../../config/config';

import { useNavigate } from 'react-router-dom';

import imgCategory from '../../../../assets/imgCategory.webp';

const cx = classNames.bind(styles);

function SlideBar() {
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

    return (
        <div className={cx(mode === 'dark' ? 'wrapper__dark' : 'wrapper')}>
            <h3>Khám phá theo danh mục</h3>
            <ul>
                {dataCategory.map((category) => (
                    <li
                        key={category._id}
                        onClick={() => {
                            const searchParams = new URLSearchParams(window.location.search);
                            searchParams.set('category', category._id);
                            navigate(`?${searchParams.toString()}`);
                        }}
                    >
                        <img src={imgCategory} alt="category" />
                        <span>{category.nameCategory}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SlideBar;
