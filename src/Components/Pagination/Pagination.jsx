import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';

import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function PaginationPage() {
    const navigate = useNavigate();

    return (
        <div className={cx('wrapper')}>
            <Pagination
                // onClick={() => {
                //     const searchParams = new URLSearchParams(window.location.search);
                //     searchParams.set('page', category._id);
                //     navigate(`?${searchParams.toString()}`);
                // }}
                count={10}
                variant="outlined"
                shape="rounded"
            />
        </div>
    );
}

export default PaginationPage;
