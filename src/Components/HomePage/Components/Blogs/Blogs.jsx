import classNames from 'classnames/bind';
import styles from './Blogs.module.scss';
import { useTheme } from '../../../../store/Provider';

import { useState, useEffect } from 'react';
import { requestGetBlogs } from '../../../../config/config';

import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Blogs() {
    const { mode } = useTheme();

    const [dataBlog, setDataBlog] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetBlogs();
            setDataBlog(res);
        };
        fetchData();
    }, []);

    return (
        <div className={cx(mode === 'dark' ? 'wrapper__dark' : 'wrapper')}>
            <h4>Bài viết </h4>
            {dataBlog.map((blog) => (
                <div
                    tabIndex="-1"
                    onClick={() => {
                        navigate(`/blog/${blog._id}`);
                    }}
                    className={cx('blog')}
                    key={blog._id}
                >
                    <img src={`${import.meta.env.VITE_URL_IMAGE}/uploads/blogs/${blog?.image}`} alt="" />
                    <div className={cx(mode === 'dark' ? 'content__dark' : 'content')}>
                        <h4>{blog.nameBlog}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Blogs;
