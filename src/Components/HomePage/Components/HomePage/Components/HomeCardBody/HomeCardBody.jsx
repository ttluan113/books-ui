import classNames from 'classnames/bind';
import styles from './HomeCardBody.module.scss';
import CardBody from '../../../../../CardBody/CardBody';

import ScrollTrigger from 'react-scroll-trigger';
import { useState } from 'react';

const cx = classNames.bind(styles);

function HomeCardBody() {
    const [visibleStates, setVisibleStates] = useState(new Array(9).fill(false));

    // Hàm xử lý khi phần tử vào viewport
    const handleEnterViewport = (index) => {
        setVisibleStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = true;
            return newStates;
        });
    };

    return (
        <div className={cx('wrapper')}>
            {[...Array(10)].map((_, index) => (
                <ScrollTrigger key={index} onEnter={() => handleEnterViewport(index)}>
                    <div className={cx('fade-in-up', { visible: visibleStates[index] })}>
                        <CardBody />
                    </div>
                </ScrollTrigger>
            ))}
        </div>
    );
}

export default HomeCardBody;
