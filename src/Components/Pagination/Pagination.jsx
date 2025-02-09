import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';

import Pagination from '@mui/material/Pagination';
import { useNavigate, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function PaginationPage({ totalPages }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Lấy giá trị `page` từ URL, nếu không có thì mặc định là 1
    const searchParams = new URLSearchParams(location.search);
    const currentPage = parseInt(searchParams.get('page')) || 1;

    const handleChange = (event, value) => {
        searchParams.set('page', value); // Cập nhật URL với page mới
        navigate(`?${searchParams.toString()}`);
    };
    return (
        <div className={cx('wrapper')}>
            <Pagination
                count={totalPages} // Tổng số trang
                page={currentPage} // Trang hiện tại
                onChange={handleChange} // Xử lý khi đổi trang
                variant="outlined"
                shape="rounded"
            />
        </div>
    );
}

export default PaginationPage;
