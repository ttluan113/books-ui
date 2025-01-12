import classNames from 'classnames/bind';
import styles from './HomeCardBody.module.scss';
import CardBody from '../../../../../CardBody/CardBody';

import ScrollTrigger from 'react-scroll-trigger';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function HomeCardBody({ products }) {
    const [visibleStates, setVisibleStates] = useState(new Array(9).fill(false));

    const handleEnterViewport = (index) => {
        setVisibleStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = true;
            return newStates;
        });
    };

    return (
        <div className={cx('wrapper')}>
            {products.map((product, index) => (
                <ScrollTrigger key={index} onEnter={() => handleEnterViewport(index)}>
                    <div className={cx('fade-in-up', { visible: visibleStates[index] })}>
                        <Link to={`/product/${product._id}`}>
                            <CardBody product={product} />
                        </Link>
                    </div>
                </ScrollTrigger>
            ))}
        </div>
    );
}

export default HomeCardBody;
