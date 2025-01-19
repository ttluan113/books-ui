import classNames from 'classnames/bind';
import styles from './DetailProduct.module.scss';
import Header from '../../Components/Header/Header';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router-dom';
import { requestAddCart, requestGetProduct } from '../../config/config';
import DOMPurify from 'dompurify';
import { useTheme } from '../../store/Provider';
import Slider from 'react-slick';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

function DetailProduct() {
    const [quantity, setQuantity] = useState(1);
    const [brandBooks, setBrandBooks] = useState([]);
    const [id, setId] = useState();
    const [product, setProduct] = useState({});

    const params = useParams();
    const { mode } = useTheme();

    useEffect(() => {
        setId(params.id);
    }, [params]);

    const fetchData = async () => {
        const res = await requestGetProduct(id);
        setProduct(res.product);
        setBrandBooks(res.brandProducts);
    };
    useEffect(() => {
        fetchData();
    }, [params, id]);

    useEffect(() => {
        document.title = `Chi tiết sản phẩm - ${product?.name}`;
    }, [product]);

    const onIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const onDecreaseQuantity = () => {
        if (quantity <= 1) {
            setQuantity(1);
        } else {
            setQuantity(quantity - 1);
        }
    };

    const [sumPrice, setSumPrice] = useState(0);

    useEffect(() => {
        const price = product?.price * quantity;
        setSumPrice(price);
    }, [quantity, product]);

    const sanitizedDescription = DOMPurify.sanitize(product?.description);

    const handleAddCart = async () => {
        const data = {
            productId: product?._id,
            quantity,
        };
        try {
            const res = await requestAddCart(data);
            await fetchData();
            toast.success(res.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <header>
                <Header />
            </header>
            <main className={cx('main')}>
                <div className={cx(mode === 'dark' ? 'left__dark' : 'left')}>
                    {product?.images?.length > 1 ? (
                        <Slider {...settings}>
                            {product.images.map((image, index) => (
                                <div key={index}>
                                    <img
                                        src={`${import.meta.env.VITE_URL_IMAGE}/uploads/products/${image}`}
                                        alt="123"
                                    />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div>
                            <img src={`${import.meta.env.VITE_URL_IMAGE}/uploads/products/${product?.images}`} alt="" />
                        </div>
                    )}

                    <div className={cx(mode === 'dark' ? 'product-related__dark' : 'product-related')}>
                        <h4>Sản phẩm liên quan</h4>
                        <div className={cx('list-product-related')}>
                            <ul>
                                {brandBooks.slice(0, 5).map((brandBook, index) => (
                                    <li key={index} onClick={() => setId(brandBook._id)}>
                                        <img
                                            src={`${import.meta.env.VITE_URL_IMAGE}/uploads/products/${
                                                brandBook.images[0]
                                            }`}
                                            alt=""
                                        />
                                        <div className={cx('product-name')}>
                                            <h5>{brandBook.name}</h5>
                                            <span id={cx('price')}>{brandBook.price.toLocaleString()} ₫</span>
                                            <Rating name="read-only" value={5} readOnly size="small" />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={cx(mode === 'dark' ? 'center__dark' : 'center')}>
                    <div className={cx('info')}>
                        <h1>{product?.name}</h1>
                        <Box className={cx('rating')}>
                            <span>4.5</span>
                            <Rating name="read-only" value={5} readOnly size="small" />
                            <p>(4)</p>
                            <span className={cx('sold')}>| Đã Bán {product?.countBuy}</span>
                        </Box>
                        <span className={cx('price')}>{product?.price?.toLocaleString()} ₫</span>
                    </div>
                    <div className={cx('description')}>
                        <h4>Thông tin chi tiết</h4>
                        <div className={cx('detail')}>
                            <div className={cx('detail-item')}>
                                <span>Công ty phát hành</span>
                                <p>{product?.options?.company}</p>
                            </div>

                            <div className={cx('detail-item')}>
                                <span>Ngày xuất bản</span>
                                <p>{product?.options?.publicationDate}</p>
                            </div>

                            <div className={cx('detail-item')}>
                                <span>Loại bìa</span>
                                <p>{product?.options?.type === '1' ? 'Bìa mềm' : 'Bìa cứng'}</p>
                            </div>

                            <div className={cx('detail-item')}>
                                <span>Kích thước</span>
                                <p>{product?.options?.size} cm</p>
                            </div>

                            <div className={cx('detail-item')}>
                                <span>Số trang</span>
                                <p>{product?.options?.page} trang</p>
                            </div>

                            <div className={cx('detail-item')}>
                                <span>Nhà xuất bản</span>
                                <p>{product?.options?.publishingHouse}</p>
                            </div>
                        </div>
                    </div>

                    <div className={cx('detail-description')}>
                        <h4>Mô tả sản phẩm</h4>
                        <div className={cx('div')} dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
                    </div>
                </div>
                <div className={cx(mode === 'dark' ? 'right__dark' : 'right')}>
                    <div>
                        <div className={cx('quantity-left')}>
                            <h4>Số Lượng</h4>
                            <p>Số lượng còn lại trong kho : {product?.quantity}</p>
                        </div>

                        <div className={cx('quantity')}>
                            <button disabled={quantity <= 1} onClick={onDecreaseQuantity}>
                                -
                            </button>
                            <input onChange={(e) => setQuantity(e.target.value)} value={quantity} type="number" />
                            <button onClick={onIncreaseQuantity}>+</button>
                        </div>

                        <div className={cx('total')}>
                            <p>Tạm Tính</p>
                            <p className={cx('total-price')}>{sumPrice?.toLocaleString()} ₫</p>
                        </div>

                        <div className={cx('button-group')}>
                            <button className={cx('button-buy')}>Mua Ngay</button>
                            <button onClick={handleAddCart} className={cx('button-add-to-cart')}>
                                Thêm Vào Giỏ Hàng
                            </button>
                        </div>
                    </div>

                    <div className={cx('feed-back')}>
                        <h4>Khách hàng đánh giá</h4>
                        <div className={cx('feed-back-item')}>
                            <div className={cx('feed-back-item-left')}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/468635100_2030335600772187_8549397888606208782_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=4i0l7tJGlYkQ7kNvgG8SF1x&_nc_oc=AdjxM7_BD6oHPGnki5DHSjtVSaNXZ-Kit8Lx6mzvtCfqE08kG-msHgVri4I_rZ6wE2lMksScatVlNdA_BwUUi8Vg&_nc_zt=24&_nc_ht=scontent.fhan3-4.fna&_nc_gid=AZs6NpFZ6wjmK_D9vXSO805&oh=00_AYA4MzhE62btNFzyCuDTfCNJ9f8CuqEaPNSA15Zh9EYX2w&oe=676D5C0B"
                                />
                                <div className={cx('feed-back-item-right')}>
                                    <h5>Nguyễn Văn A</h5>
                                    <Rating name="read-only" value={5} readOnly size="small" />
                                    <p>Shop đóng gói cẩn thận, giao hàng đúng theo thời gian dự kiến. cảm ơn shop!</p>
                                    <span className={cx('time')}>12/12/2024</span>
                                </div>
                            </div>

                            <div className={cx('feed-back-item-left')}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/468635100_2030335600772187_8549397888606208782_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=4i0l7tJGlYkQ7kNvgG8SF1x&_nc_oc=AdjxM7_BD6oHPGnki5DHSjtVSaNXZ-Kit8Lx6mzvtCfqE08kG-msHgVri4I_rZ6wE2lMksScatVlNdA_BwUUi8Vg&_nc_zt=24&_nc_ht=scontent.fhan3-4.fna&_nc_gid=AZs6NpFZ6wjmK_D9vXSO805&oh=00_AYA4MzhE62btNFzyCuDTfCNJ9f8CuqEaPNSA15Zh9EYX2w&oe=676D5C0B"
                                />
                                <div className={cx('feed-back-item-right')}>
                                    <h5>Nguyễn Văn A</h5>
                                    <Rating name="read-only" value={5} readOnly size="small" />
                                    <p>Shop đóng gói cẩn thận, giao hàng đúng theo thời gian dự kiến. cảm ơn shop!</p>
                                    <span className={cx('time')}>12/12/2024</span>
                                </div>
                            </div>

                            <div className={cx('feed-back-item-left')}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/468635100_2030335600772187_8549397888606208782_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=4i0l7tJGlYkQ7kNvgG8SF1x&_nc_oc=AdjxM7_BD6oHPGnki5DHSjtVSaNXZ-Kit8Lx6mzvtCfqE08kG-msHgVri4I_rZ6wE2lMksScatVlNdA_BwUUi8Vg&_nc_zt=24&_nc_ht=scontent.fhan3-4.fna&_nc_gid=AZs6NpFZ6wjmK_D9vXSO805&oh=00_AYA4MzhE62btNFzyCuDTfCNJ9f8CuqEaPNSA15Zh9EYX2w&oe=676D5C0B"
                                />
                                <div className={cx('feed-back-item-right')}>
                                    <h5>Nguyễn Văn A</h5>
                                    <Rating name="read-only" value={5} readOnly size="small" />
                                    <p>Shop đóng gói cẩn thận, giao hàng đúng theo thời gian dự kiến. cảm ơn shop!</p>
                                    <span className={cx('time')}>12/12/2024</span>
                                </div>
                            </div>

                            <div className={cx('feed-back-item-left')}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/468635100_2030335600772187_8549397888606208782_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=4i0l7tJGlYkQ7kNvgG8SF1x&_nc_oc=AdjxM7_BD6oHPGnki5DHSjtVSaNXZ-Kit8Lx6mzvtCfqE08kG-msHgVri4I_rZ6wE2lMksScatVlNdA_BwUUi8Vg&_nc_zt=24&_nc_ht=scontent.fhan3-4.fna&_nc_gid=AZs6NpFZ6wjmK_D9vXSO805&oh=00_AYA4MzhE62btNFzyCuDTfCNJ9f8CuqEaPNSA15Zh9EYX2w&oe=676D5C0B"
                                />
                                <div className={cx('feed-back-item-right')}>
                                    <h5>Nguyễn Văn A</h5>
                                    <Rating name="read-only" value={5} readOnly size="small" />
                                    <p>Shop đóng gói cẩn thận, giao hàng đúng theo thời gian dự kiến. cảm ơn shop!</p>
                                    <span className={cx('time')}>12/12/2024</span>
                                </div>
                            </div>

                            <div className={cx('feed-back-item-left')}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/468635100_2030335600772187_8549397888606208782_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=4i0l7tJGlYkQ7kNvgG8SF1x&_nc_oc=AdjxM7_BD6oHPGnki5DHSjtVSaNXZ-Kit8Lx6mzvtCfqE08kG-msHgVri4I_rZ6wE2lMksScatVlNdA_BwUUi8Vg&_nc_zt=24&_nc_ht=scontent.fhan3-4.fna&_nc_gid=AZs6NpFZ6wjmK_D9vXSO805&oh=00_AYA4MzhE62btNFzyCuDTfCNJ9f8CuqEaPNSA15Zh9EYX2w&oe=676D5C0B"
                                />
                                <div className={cx('feed-back-item-right')}>
                                    <h5>Nguyễn Văn A</h5>
                                    <Rating name="read-only" value={5} readOnly size="small" />
                                    <p>Shop đóng gói cẩn thận, giao hàng đúng theo thời gian dự kiến. cảm ơn shop!</p>
                                    <span className={cx('time')}>12/12/2024</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default DetailProduct;
