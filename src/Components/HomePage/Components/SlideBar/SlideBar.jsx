import classNames from 'classnames/bind';
import styles from './SlideBar.module.scss';
import { useTheme } from '../../../../store/Provider';
import { useEffect, useState } from 'react';
import { requestGetCategory } from '../../../../config/config';

import imgCategory from '../../../../assets/imgCategory.webp';

const cx = classNames.bind(styles);

function SlideBar() {
    const { mode } = useTheme();

    const [dataCategory, setDataCategory] = useState([]);
    const [valueCategory, setValueCategory] = useState('');

    const fetchData = async () => {
        const res = await requestGetCategory(valueCategory);
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
                    <li key={category._id}>
                        <img src={imgCategory} alt="category" />
                        <span>{category.nameCategory}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SlideBar;
