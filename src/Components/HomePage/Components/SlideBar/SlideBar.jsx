import classNames from 'classnames/bind';
import styles from './SlideBar.module.scss';
import { useTheme } from '../../../../store/Provider';
const cx = classNames.bind(styles);

function SlideBar() {
    const { mode } = useTheme();

    return (
        <div className={cx(mode === 'dark' ? 'wrapper__dark' : 'wrapper')}>
            <h3>Khám phá theo danh mục</h3>
            <ul>
                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>

                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>

                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>

                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>

                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>

                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>

                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>
                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>
                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>
                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>
                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>
                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>
                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>

                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>

                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>

                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>

                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>
                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>
                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>
                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>
                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>
                <li>
                    <img src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp" />
                    <span>Truyện Cười</span>
                </li>
            </ul>
        </div>
    );
}

export default SlideBar;
