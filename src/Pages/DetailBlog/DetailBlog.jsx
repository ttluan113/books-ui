import classNames from 'classnames/bind';
import styles from './DetailBlog.module.scss';

import Header from '../../Components/Header/Header';
import { useEffect, useState } from 'react';
import { requestGetBlog } from '../../config/config';

import { useParams, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function DetailBlog() {
    const { id } = useParams();

    const [dataBlog, setDataBlog] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await requestGetBlog(id);
                setDataBlog(res);
            } catch (error) {
                navigate('/notfound');
            }
        };
        fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx('main')}>
                <h1>{dataBlog.nameBlog}</h1>
                <div dangerouslySetInnerHTML={{ __html: dataBlog.content }}></div>
            </main>
        </div>
    );
}

export default DetailBlog;
